var Database = require('better-sqlite3');
var db = new Database('./Bangazon.db');
var faker = require('faker');


var deptTable = db.prepare('INSERT INTO Departments VALUES (@Id, @Name, @Budget)');
var empTable = db.prepare('INSERT INTO Employee VALUES (@Id, @FirstName, @LastName, @Title, @Salary, @DepartmentId)');
var trainingTable = db.prepare('INSERT INTO TrainingPrograms VALUES (@Id, @StartDate, @EndDate, @Title, @MaxCapacity)');
var productTypeTable = db.prepare('INSERT INTO ProductTypes VALUES (@Id, @Type)');
var customersTable = db.prepare('INSERT INTO Customers VALUEs (@Id, @FirstName, @LastName, @DateCreated, @Active)');
var computersTable = db.prepare('INSERT INTO Computers VALUES (@Id, @PurchaseDate, @DecomissionDate, @OS, @Brand, @Status)')
var paymentTypesTable = db.prepare('INSERT INTO PaymentTypes VALUES (@Id, @Type, @AcctNum, @ExpDate, @SecCode) ')
var productsTable = db.prepare('INSERT INTO Products VALUES (@Id, @Title, @Price, @ProdDescription, @Quantity, @CustomerId, @ProductTypeId)')

console.log("SEEDING...")

const seedProductsTable = (howMany) => {
    for (let i = 0; i < howMany; i++) {
        let title = faker.commerce.product()
        let price = faker.commerce.price()
        let prodDesc = faker.lorem.paragraph()
        let quan = faker.random.number()
        let custId = Math.floor((Math.random()*50)+1)
        let prodTypeId = Math.floor((Math.random() * 10) + 1)

        productsTable.run({
            Id: null,
            Title: title,
            Price: price,
            ProdDescription: prodDesc,
            Quantity: quan,
            CustomerId: custId,
            ProductTypeId: prodTypeId
        })
    }
}

const seedPaymentTypesTable = (howMany) => {
    for (let i = 0; i < howMany; i++) {
        let typeArr = ["Cash","Credit","Debit","Bank Account"]
        let type = typeArr[Math.floor(Math.random() * 4)]
        let secCode = Math.floor((Math.random()*(999-222+1)+222))
        let acctNum = faker.finance.account()
        let expDate = faker.date.future().toString()

        paymentTypesTable.run({
            Id: null,
            Type: type,
            AcctNum: acctNum,
            ExpDate: expDate,
            SecCode: secCode
        })
    }
}

const seedComputersTable = (howMany) => {
    for (let i = 0; i < howMany; i++) {
        let purchaseDate = faker.date.past().toString()
        let decomDate = faker.date.future().toString()
        let osArr = ["macOS","Windows 10", "Windows 7","Linux"]
        let brandArr = ["Dell","Apple","HP","Lenovo","System76","Acer"]

        let os = osArr[Math.floor(Math.random()*4)]
        let brand = brandArr[Math.floor(Math.random() * 6)]
        computersTable.run({
            Id: null,
            PurchaseDate: purchaseDate,
            DecomissionDate: decomDate,
            OS: os,
            Brand: brand,
            Status: "Active"
        })
    }
}

const seedCustomersTable = (howMany) => {
    for (let i = 0; i < howMany; i++) {
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        let date = faker.date.past().toString()
        customersTable.run({
            Id: null,
            FirstName: firstName,
            LastName: lastName,
            DateCreated: date,
            Active: 1
        })
    }
}

const seedProductTypesTable = (howMany) => {
    for (let i = 0; i < howMany; i++) {
        let product = faker.commerce.product()
        productTypeTable.run({
            Id: null,
            Type: product
        })
    }
}

const seedTrainingTable = (howMany) => {
    for (let i = 0; i < howMany; i++) {
        let startDate = faker.date.future().toString()
        let endDate = faker.date.future().toString()
        let maxCap = faker.random.number()
        let title = faker.company.catchPhraseDescriptor()

        trainingTable.run({
            Id: null,
            StartDate: startDate,
            EndDate: endDate,
            Title: title,
            MaxCapacity: maxCap
        })
    }
}

const seedDepartmentTable = (howMany) => {
for (let i=0; i < howMany; i++){
        let departmentName = faker.name.jobArea()
        let deptBudget = faker.finance.amount()

        deptTable.run({
            Id: null,
            Name: departmentName,
            Budget: deptBudget
        })
    }
}

const seedEmployeeTable = (howMany, departments) => {
    for (let i = 0; i < howMany; i++) {
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        let jobTitle = faker.name.jobTitle()
        let salary = faker.finance.amount()
        let deptId = Math.floor((Math.random() * departments) + 1)
        console.log(`${firstName} ${lastName} ${jobTitle} ${salary} ${deptId}`)

        empTable.run({
            Id: null,
            FirstName: firstName,
            LastName: lastName,
            Title: jobTitle,
            Salary: salary,
            DepartmentId: deptId
        })
    }
}


// seedDepartmentTable(20)
// seedEmployeeTable(100, 20)
// seedTrainingTable(20)
// seedProductTypesTable(10)
// seedCustomersTable(50)
// seedComputersTable(30)
// seedPaymentTypesTable(50)
seedProductsTable(100)