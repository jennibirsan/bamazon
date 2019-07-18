var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "jennibirsan",

    // Your password
    password: "Miami2ibiza!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    saleItems();
});

function saleItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var arrayTable = [];
        for (var i = 0; i < res.length; i++) {
            arrayTable.push(
                {
                    Item_ID: res[i].item_id,
                    Item: res[i].product_name,
                    Price: res[i].price
                }
            )
        }
        console.table(arrayTable)
        askUser();

    })
};

function askUser() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter Item ID for your purchase",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }, {
                name: "stock",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.id }, function (err, res) {
                if (err) throw err
                var purchaseItem = answer.id;
                var newStockQty = res[0].stock_quantity - answer.stock;
                var totalPrice = answer.stock * res[0].price
                if (res[0].stock_quantity < answer.stock) {
                    console.log("\nNot enough stock! \n")
                    askUser();
                } else {
                    console.log("\nUpdating stock...\n");
                    var sql = "UPDATE products SET stock_quantity = " + newStockQty + " WHERE item_id  = " + purchaseItem;
                    connection.query(sql, function (err, res) {
                        if (err) throw err
                        console.log(res.affectedRows + " your purchase is complete! Your total was $" + totalPrice.toFixed(2) + "\n");
                        finishShopping();
                    });
                }
            });
        })
};

function finishShopping() {
    inquirer
        .prompt([{
            name: "next",
            type: "list",
            choices: ["Yes", "No"],
            message: "Are you finished with your shopping?"
        }]).then(function (res) {
            if (res.next === "Yes") {
                end();
            } else { askUser(); }
        })
}
// function asking if they want more products or quit
function end() {
    console.log("Thank you! Come again; goodbye!")
    connection.end()
    process.exit()
};


