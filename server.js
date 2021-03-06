// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var cors = require('cors');


app.use(cors());

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var findById = function(collection, _id, cb){
  var coll = collection.slice( 0 ); // create a clone

  (function _loop( data ) {
    if( data.contractId === _id ) {
      cb.apply( null, [ data ] );
    }
    else if( coll.length ) {
      setTimeout( _loop.bind( null, coll.shift() ), 25 );
    }
  }( coll.shift() ));
};

var contracts = [{
    contractId: 1,
    name: 'NDA Contract',
    description: 'A non-disclosure agreement (NDA), also known as a confidentiality agreement (CA), confidential disclosure agreement (CDA), proprietary information agreement (PIA), or secrecy   agreement (SA)',
    budget: 25000,
    currencyOfBudget: 'UAH',
    createdDate: new Date(),
    document: 'http://www.polyu.edu.hk/iaee/files/pdf-sample.pdf'
  },
  {
    contractId: 2,
    name: 'Sales Contract',
    description: 'A sales contract documents the terms of a sales transaction between a seller and a buyer. The contract should identify the product sold, the quantity, pricing, payment terms, quality standards and delivery terms. Additionally, the parties may specify any insurance requirements, termination provisions and the process for resolving disputes.',
    budget: 20000,
    currencyOfBudget: 'USD',
    createdDate: new Date(),
    document: 'http://www.polyu.edu.hk/iaee/files/pdf-sample.pdf'
  },
  {
    contractId: 3,
    name: 'Distributor Contract',
    description: 'This is a new contract which we will use for work with our clients',
    budget: 21550,
    currencyOfBudget: 'UAH',
    createdDate: new Date(),
    document: 'http://www.polyu.edu.hk/iaee/files/pdf-sample.pdf'
  }
];

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/service)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /contract
// ----------------------------------------------------
router.route('/contract')

	// get all the contracts (accessed at GET http://localhost:8080/service/get)
	.get(function(req, res) {
			res.json(contracts);
	})
  // create a contract (accessed at PUT http://localhost:8080/contracts)
  .post(function(req, res) {

    var contract = {
      contractId: contracts.length + 1,
      name: req.body.name,
      description: req.body.description,
      budget: req.body.budget,
      currencyOfBudget: req.body.currencyOfBudget,
      createdDate: new Date(),
      document: 'http://www.polyu.edu.hk/iaee/files/pdf-sample.pdf'
  };		// create a new instance

  contracts.push(contract);
  res.json({ message: 'Contract created!', contractId: contracts.length});

  });

// on routes that end in /get/:contractId
// ----------------------------------------------------
router.route('/contract/:contractId')

	// get the contract with that id
	.get(function(req, res) {

    findById(contracts, parseInt(req.params.contractId), function(data){
        res.json(data);
    });

	})

	// delete the contract with this id
	.delete(function(req, res) {
    findById(contracts, parseInt(req.params.contractId), function(data) {
      contracts.splice(contracts.indexOf(data), 1);
      res.json({ message: 'Successfully deleted' });
    });

	});


// REGISTER OUR ROUTES -------------------------------
app.use('/service', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
