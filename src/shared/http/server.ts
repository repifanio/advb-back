import 'dotenv/config';
import app from '@/shared/http/app';

app.listen(process.env.PORT, () => {
  console.log(`💥 Server on in port: ${process.env.PORT}`);
});
