
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '@prisma/client';
import {type } from "os";
import { buffer } from "micro";


export const config = {
    api: {
        bodyParser: false
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: ''
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
   const buf = await buffer(req)
   const sig = req.header('stripe-signature')

   if(!sig){
    return res.status(400).send("Missing the stripe signature")
   }

   let event: Stripe.Event
   try {
 event = stripe.webhooks.constructEvent(
    buf, sig, process.env.STRIPE_WEBHOOK_SECRET!
   )
} catch(err){
return res.status(400).send("webhook error" + err);
}

switch(event.type){
    case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge 

        if(typeof charge.payment_intent === 'string'){
            await prisma?.order.update({
                where: {paymentIntentId: charge.payment_intent},
                data: {status: "complete", address: charge.shipping?.address },

            });
        }
        break;
        default:
            console.log("Unhandled event type:" + event.type);

}

res.json(( received: true ));

}