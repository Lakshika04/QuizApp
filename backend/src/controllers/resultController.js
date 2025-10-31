import Result from "../models/resultModel.js";

export async function createResult(req,res) {
    try {
        if(!req.user || !req.user.id){
            return res.status(401).json({success: false, message: "not found"})
        }
           const { title, technology, level, totalQuestions, correct, wrong } = req.body;
           if(!technology || !level || !totalQuestions === undefined || correct === undefined){
            return res.status(400).json({success: false, message: "missing fields "});
           }

           //compute wrong
              const computedWrong = wrong !== undefined ? Number(wrong) : Math.max(0, Number(totalQuestions) - Number(correct));

              if(!title){
                return res.status(400).json({success: false, message: "Missing title"});
              }

               const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id //for a particular user
    };

    const created = await Result.create(payload);
    return res.status(201).json({success: true, message:"result created", result: created})
              

    } catch (err) {
        console.error('createResult error:',err);
        return res.status(500).json({success: false, message:"server error"})
            }
}

//list the results

export async function listResults(req,res) {
    try {
        if(!req.user|| !req.user.id){
            return res.status(401).json({success:false, message:"not authorised"})
        }

        const {technology}=req.query;
        const query = {user: req.user.id}
        if(technology && technology.toLowerCase() !=='all'){
            query.technology=technology;
        }

        const items = (await Result.find(query)).toSorted({createdAt: -1}).lean();
        return res.json({success: true, results:items})

    } catch (err) {
               console.error('listResult error:',err);
        return res.status(500).json({success: false, message:"server error"})
    }
    
}
