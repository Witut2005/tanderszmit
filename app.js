const Color = require('./colors.js')
const prompt = require('prompt-sync')({ sigint: true })
const ArgumentParser = require('argparse')
const mySql = require('mysql')

const NewPoll = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: ''
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Parser = new ArgumentParser.ArgumentParser()

Parser.add_argument('-co')
args = Parser.parse_args()


if (args['co'] == 'zaimki_osobowe_biernik') {
    NewPoll.query('select * from niemiecki.zaimki_osobowe_biernik', (err, result) => {

        while (true) {
            idOfQuestion = getRandomInt(8)
            console.log(result[idOfQuestion].pl)
            givenAnswear = prompt('podaj odpowiedz: ')
            if (givenAnswear == result[idOfQuestion].de)
                console.log(Color.FgGreen + 'ja, ferszteje diese verse')
            else
                console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].de)

            console.log(Color.Reset, end = '')
            console.log('--------------------')
        }

    })
} else
    console.log('iś ferszteje niszt')