const createPetData = require('../newPet.json');
const putData = require('../updatePet.json');
const { test, expect } = require('@playwright/test');
const apiURL = 'https://petstore.swagger.io/v2/pet';
let body = {};

test('Add pet to system', async ({ request }) => {
    const petResp = await request.post(apiURL, {
        data: createPetData,
        headers: {
            "content-type": "application/json"
        }
    });
    body = await petResp.json();
    expect(await petResp.status()).toEqual(200);
});

test('Check if pet added successfully', async ({ request }) => {
    const petResp = await request.get(apiURL + `/${body.id}`);
    expect(await petResp.status()).toEqual(200);
});

test('Update pet name', async ({ request }) => {
    const petResp = await request.put(apiURL, {
        data: putData,
        headers: {
            "content-type": "application/json"
        }
    });
    body = await petResp.json();
    expect(body.name).toEqual("lilly");
});

test('Delete the pet created', async ({ request }) => {
    const petResp = await request.delete(apiURL + `/${body.id}`);
    expect(await petResp.status()).toEqual(200);
})

