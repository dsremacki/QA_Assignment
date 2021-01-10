describe('Login to application via API', () => {
     
    //Api test login with valid credentials
      it('Login with valid credentials via api', ()=> {
          cy.request({
            method: 'POST',
            url: 'https://qa-sandbox.apps.htec.rs/api/users/login',
            body: {
                "email":Cypress.env('email'),
                "password":Cypress.env('password')
            },
            headers:{
                'content-type':'application/json'
            }
          
        }).then((response)=>{
            expect(response.body).to.have.property('success')
            expect(response.body.success).to.deep.equal(true)
            if(response.status === 200){
                cy.log("You are logged in")
            }
        })
        
    })
   

  //Api test login with empty credentials
    it('Login with empty credentials via API', ()=> { 
        cy.request({
            method: 'POST',
            url: 'https://qa-sandbox.apps.htec.rs/api/users/login',
            failOnStatusCode: false,
            body: {
                "email":null,
                "password":null
            },
            headers:{
                'content-type':'application/json'
            }
          
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.deep.eq({"email":"Email field is required","password":"Password is required"})
        })
        
    })
    //Api test login with invalid credentials
    it('Login wrong credentials via API', ()=> { 
        cy.request({
            method: 'POST',
            url: 'https://qa-sandbox.apps.htec.rs/api/users/login',
            failOnStatusCode: false,
            body: {
                "email":"mail@mm.com",
                "password":"asdasdasd"
            },
            headers:{
                'content-type':'application/json'
            }
          
        }).then((response)=>{
            expect(response.status).to.eq(404)
            expect(response.body).to.deep.eq({"email":"User not found"})
        })
        
    })
//Api test login with invalid email format
    it('Login with wrong email adress/invalid format via API', ()=> { 
        cy.request({
            method: 'POST',
            url: 'https://qa-sandbox.apps.htec.rs/api/users/login',
            failOnStatusCode: false,
            body: {
                "email":"mail", 
                "password":"asdasdasd"
            },
            headers:{
                'content-type':'application/json'
            }
          
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.deep.eq({"email":"Email is invalid"})
        })
        
    })

    //Api test login with invalid email format
    it('Login with wrong password, 5 character long via API', ()=> { 
        cy.request({
            method: 'POST',
            url: 'https://qa-sandbox.apps.htec.rs/api/users/login',
            failOnStatusCode: false,
            body: {
                "email":"dsremacki@yahoo.com", 
                "password":"12345"
            },
            headers:{
                'content-type':'application/json'
            }
          
        }).then((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body).to.deep.eq({"password":"Password must be at least 6 characters long"})
        })
        
    })


    it('Login with wrong password via API', ()=> { 
        cy.request({
            method: 'POST',
            url: 'https://qa-sandbox.apps.htec.rs/api/users/login',
            failOnStatusCode: false,
            body: {
                "email":"dsremacki@yahoo.com", 
                "password":"123456"
            },
            headers:{
                'content-type':'application/json'
            }
          
        }).then((response)=>{
            expect(response.status).to.eq(400)
            cy.log(response.body)
            expect(response.body).to.deep.eq({"password":"Password incorrect"})
        })
        
    })
    
})