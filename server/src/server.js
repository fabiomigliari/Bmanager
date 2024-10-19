import 'dotenv/config'
import app from './app.js';

if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

app.listen(process.env.APP_PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`API listening at port ${process.env.APP_PORT}`);
    
    
  }
});
