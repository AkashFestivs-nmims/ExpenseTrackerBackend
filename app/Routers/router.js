const router = require('express').Router();
const middleWare = require('../middleWare/middleWare.js')
const controller = require('../Controllers/controller.js');
const PaymnetController = require('../Controllers/paymentController.js');
const walletController = require('../Controllers/walletContoller.js');
const transactionController = require('../Controllers/transactionController.js');


router.post('/get-access-token',controller.generateAccessToken);
router.post('/register-user',controller.registerUser);
router.post('/get-user-detail',middleWare.verifyRequest,controller.getUserDetails);
router.post('/get-dashboard-comp',middleWare.verifyRequest,controller.getDashboardCompByRole);
router.post('/verify-user',controller.verifyUser);
router.post('/logout',middleWare.verifyRequest,controller.logOut);
router.post('/get-profie-drop-down-list',middleWare.verifyRequest,controller.getProfilDropDownList);

//* Paymnet Routings
router.post('/add-paynmet-type',middleWare.verifyRequest,PaymnetController.addPaymnetType);
router.post('/view-all-payment-type',middleWare.verifyRequest,PaymnetController.viewAllPaymentType);
router.post('/get-user-paymnet-type',middleWare.verifyRequest,PaymnetController.getUserPaymentType);
router.post('/add-payment-type-mapping',middleWare.verifyRequest,PaymnetController.addPaymnetTypeMapping);


//* Wallet Routing

router.post('/get-user-wallet',middleWare.verifyRequest,walletController.getUserWallet);
router.post('/update-wallet-ammount',middleWare.verifyRequest,walletController.updateWalletMoney);
router.post('/update-wallet-colour',middleWare.verifyRequest,walletController.updateWalletColour);
router.post('/currency-list',middleWare.verifyRequest,walletController.currencyList);
router.post('/add-wallet',middleWare.verifyRequest,walletController.addWallet);

//*Transaction Routing

router.post('/initialize_transaction',middleWare.verifyRequest,transactionController.initializeTransaction)

module.exports = router;