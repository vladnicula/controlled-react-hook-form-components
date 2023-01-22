// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// NOT PRODUCTIN READY
// NOT PART OF THE FORM DISCUSSION/VIDEO
// THIS IS JUST A MOCK
import type { NextApiRequest, NextApiResponse } from 'next'

type Success = {
  success: true
}

type Error = {
  success: false,
  error: string
}

let THE_DATABASE: Record<string, unknown> | null = null

const updateCarSale = (
    req: NextApiRequest,
    res: NextApiResponse<Success | Error>
) => {
    THE_DATABASE = req.body
    // probably not the best status code here
    res.status(200).json({success: true})
}

const createCarSale = (
    req: NextApiRequest,
    res: NextApiResponse<Success | Error>
) => {
    THE_DATABASE = req.body
    // probably not the best status code here
    res.status(200).json({success: true})
}


const getCarSale = (
    _req: NextApiRequest,
    res: NextApiResponse<Record<string, unknown> | Error>
) => {
    if ( THE_DATABASE ) {
        return res.status(200).json({
            success: true,
            data: THE_DATABASE
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "The database is in another castle"
        })
    }
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Success | Error | Record<string, unknown>>
) {

    await new Promise((resolve) => setTimeout(resolve, 1000))
    switch(req.method) {
    case "PUT":
        return updateCarSale(req, res)
    case "POST":
        return createCarSale(req, res)
    case "GET":
        return getCarSale(req, res)
    }
    
  
    res.status(500).json({ success:false, error: 'Well this is awkward' })
}
