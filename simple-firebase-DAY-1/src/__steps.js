/**
 *          ------------------
 *               initial INSTALLATION
 *          ------------------
 * 1. Visit: console.firebase.google.com
 * 2.Create projects(skip googlr analytics)
 * 3.Register app(create config)
 * 4.install firebase:npm install firebase
 * 5.add config file to your projects
 * 6.Danger: Do not publish or make firebase config to public by  pushing  to github
 *                 ----------
 *                    INTEGRATION
 *                     ----------
 * 7.Visit: Go to Docs > Build > Authentication > Web > Get strated
 * 8.export app from the firebase.config.js file: export default app
 * 9.Login.jsx: import getAuth from firebase/auth
 *             -------------------------
 *                prOVIDER SETUP
 *                -----------------------
 * 10.create const auth=getAuth(app)
 * 11.import googleAuthProvider and create a new provider
 * 12.use SignInWithPopUp and pass auth and provider
 * 13.activate sign-in method(google,facebook,github etc)
 *                 ----------------------------
 *                   More Auth Provider
 *                  ---------------------------
 * 1.active the auth provider (create app,provide redirect url,cliend id ,client secret)
 * 
 * 
 * */ 