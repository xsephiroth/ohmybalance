import TCB from "@cloudbase/js-sdk";

const tcb = TCB.init({
  env: process.env.REACT_APP_CLOUDBASE_ENV_ID,
});

export default tcb;
