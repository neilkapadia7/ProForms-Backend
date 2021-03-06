const Users = require('@models/Users')
const Forms = require('@models/Forms')
const Responder = require('@service/response')

module.exports = {
    // api/forms/admin/add
    async addForm (req, res) {
        try {
            let noOfQuestion = req.body.questions.length

            const newForm = await new Forms(
                {
                    ...req.body, 
                    noOfQuestion,
                    userId: req.user.id
                }).save()
            return Responder.respondWithSuccess(req, res, newForm, 'Successfully Created Form');
        }
        catch (err) {
            console.log(err);
            return Responder.respondWithError(req,res, err)
        }
    }, 

    // api/forms/admin/update/:id
    async updateForm (req, res) {
        try {
            const {isUserAuthorized, isPrivate, questions, title, validityDate} = req.body;
            let forms = await Forms.findOne({_id: req.params.id})
            if(!forms)
                return Responder.respondWithCustomError(req, res, 'Invalid ID')

            forms.isUserAuthorized = isUserAuthorized
            forms.isPrivate = isPrivate
            forms.questions = questions
            forms.title = title
            forms.validityDate = validityDate
            await forms.save()
            
            return Responder.respondWithSuccess(req, res, newForm, 'Successfully Updated Form');
        }
        catch (err) {
            console.log(err);
            return Responder.respondWithError(req,res, err)
        }
    },
    // api/forms/admin/delete/:id
    async removeForm (req, res) {
        try {
            let forms = await Forms.findOne({_id: req.params.id})
            if(!forms)
                return Responder.respondWithCustomError(req, res, 'Invalid ID')

            forms.isDeleted = true
            await forms.save()     
            return Responder.respondWithSuccess(req, res, newForm, 'Successfully Deleted Form');       
        } catch (error) {
            console.log(error);
            return Responder.respondWithError(req,res, error)
        }
    }
}