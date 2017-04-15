var inquirer = require("inquirer");
var fs= require("fs");

//we make  constructor to creat basiccard and clozecard
function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

function  ClozeCard(text,cloze){
	this.text = text;
	this.cloze  = cloze;
}

//we add function in clozecard constructor and the name is partial and make partial
ClozeCard.prototype.partial = function()
{
	if(this.text.includes(this.cloze))
	{
		return this.text.replace(this.cloze,"........")
	}
	else{
		return("nothing found");
	}
};

//then we make inquirer with promises
inquirer.prompt({
    type: 'list',
    name: 'cards',
    message: 'Choose your card?',
    choices: ['BasicCard', 'Clozure']
}).then(function (data) {
    if(data.cards === 'BasicCard'){
        return inquirer.prompt([
            {
                type: 'input',
                name: 'front',
                message: 'Add your front message'
            }, {
                type: 'input',
                name: 'back',
                message: 'Add your back message'
            }
        ]);
    }
    else{
        return inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Add your text message'
            }, {
                type: 'input',
                name: 'cloze',
                message: 'Add your deletion message'
            }
        ]);
    }

//after inquirer now we make new object from constructor then put the informations in to the json file
}).then(function(data)
{
	if(data.front){
            var basic = new BasicCard(data.front, data.back);
             //console.log(basic);
             addCards({data: basic});

        }
        else{
            var cloze = new ClozeCard(data.text, data.cloze);
             //console.log(cloze);
             //console.log(cloze.partial());
             addCards({data: cloze, partial: cloze.partial()});
        }


    })

        
    .catch(function (err) {
     console.log(err);
});

   var addCards = function (add) {
    fs.readFile('./data.json', 'utf8', function (error, data) {
        if(error) throw error;

        var arr = JSON.parse(data);

        arr.cards.push(add);
        //console.log(arr);

        fs.writeFile('./data.json', JSON.stringify(arr), 'utf8', function (err) {
            if(err) throw err;
            console.log("Process completed!!!");
        });
    });
};