import debug from 'debug';


export default {
  log: (msg) => {
    debug('src:log')(msg);
  },
  err: (msg) => {
    debug('src:err')(msg);
  }
};