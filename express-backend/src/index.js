import express from 'express';
import {createClient} from 'redis';

const app = express();
app.use(express.json());

const client  = createClient();
client.connect();

app.post('/submit', async (req,res,next) => {
    const { problemId, userId, code, lang} = req.body;
try {
        await client.lPush('submissions',JSON.stringify({problemId, userId, code, lang}))
        res.json({message: 'Submission received'})
} catch (error) {
    res.json({message: 'Submission failed'})
    
}    
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})



