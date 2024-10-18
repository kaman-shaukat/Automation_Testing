/*Playwright can be used to get access to the REST API of your application.

Sometimes you may want to send requests to the server directly from Node.js without loading a page and running js code in it. A few examples where it may come in handy:

Test your server API.
Prepare server side state before visiting the web application in a test.
Validate server side post-conditions after running some actions in the browser.

At the end of the day, anything that is included in the API response body can now be tested via JavaScript 
and TypeScript in Playwright

if you are for example, dealing with some RESTful API, you could create resources, check if they are really created there, update them and then delete them
and all in a single Playwright test case.It is a efficient way to test that your APIs are working properly.

You could now run these API tests in your CI/CD Pipeline Whenever you push to any Dev/QA environment
you can check your API end points from multiple locations and run API health checks every one hour
Purpose to automate API
Before our customers notice, We should be the first one to know about it, In case something is off with any API 
under tests

*/


// how to run a GET API request (Using Type Script)
// Step 1 - Add imports
import { test, expect } from '@playwright/test';
import { TestContext } from 'node:test';
import { json } from 'stream/consumers';

test.describe.parallel('API Automation Testing', () => {

    const baseUrl = 'https://reqres.in/api'
    // Step 2 - Create a test using request context
    test('API GET Request', async ({ request }) => {
        // Step 3 - Send a GET Request and store a response in variable
        const response = await request.get(`${baseUrl}/users/2`)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        // Step 4 - Verify the status code of the response is 200
        expect(response.status()).toBe(200)
        // Step 5 - Verify the response content value
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toContain('Janet')
        expect(responseBody.data.last_name).toContain('Weaver')
        expect(responseBody.data.email).toBeTruthy

    })

    test('API POST Request for Login/Token', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()


    })

    test('API POST Request - Create new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                "name": "Kamran",
                "job": "leader"
            }
        })
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(201)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.name).toContain('Kamran')
        expect(responseBody.job).toContain('leader')

    })

    test('API PUT Request - update user data', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                "name": "update name",
                "job": "update job"
            }
        })

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        expect(response.status()).toBe(200)
        expect(responseBody.name).toContain('update name')
        expect(responseBody.job).toContain('update job')
        expect(responseBody.updatedAt).toBeTruthy()

    })

    test('API DELET Request - Delete User Record', async ({ request }) => {
        // Step 1 - Send a DELET Request
        const response = await request.delete(`${baseUrl}/users/2`)
        // Step 2 - Verify the status code of the response is 204
        expect(response.status()).toBe(204)

    })

    test('Verify GET API Request that Does it handles missing or invalid request parameters', async ({ request }) => {
        // Step 3 - Send a GET Request with invalid endpoint that does not exist
        const response = await request.get(`${baseUrl}/users/Invalid_Endpoint`)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        // Step 4 - Verify the status code of the response is 404
        expect(response.status()).toBe(404)

    })

})