const { weatherApiGet}= require('./weather')
const axios = require('axios').default;

jest.mock('axios')

describe('sydney weather', ()=>{
    afterEach(() => {
        jest.resetAllMocks();
     })
    test('Should return correct value', async() => {
        axios.get.mockResolvedValue({
            data: {
                weather:[{
                    description: "clouds"
                }]
            }
        })

        const city="Sydney"

        const data = await weatherApiGet(city)
        const info = JSON.parse(data)
        console.log('info', info)
        expect(info).toEqual('clouds');
        expect(typeof info).toBe("string")
        expect(axios.get).toHaveBeenCalledTimes(1);
    })
    test('Should return error if fail', async() => {
        axios.get.mockRejectedValue(new Error('Axios weather get error:'))

        const city="Sydney"

        const data = await weatherApiGet(city)
        console.log('data', data)
        expect(data).toEqual(new Error('Sorry error'));
        expect(axios.get).toHaveBeenCalledTimes(1);
    })
})