import React, { useState, useEffect, useRef } from 'react';

// --- Data for MongoDB Cheat Sheet ---
const mongoCheatSheetData = [
    {
        id: 'database',
        title: 'Database Commands',
        intro: 'This section covers essential commands for managing databases in MongoDB. You can list all databases, switch between them, or drop them entirely. Creating a database is implicit; MongoDB creates it when you first store data in it.',
        commands: [
            { title: 'Show all databases', code: 'show dbs' },
            { title: 'Switch to a database', code: 'use my_database' },
            { title: 'Show current database', code: 'db' },
            { title: 'Drop the current database', code: 'db.dropDatabase()' },
        ],
    },
    {
        id: 'collection',
        title: 'Collection Commands',
        intro: "Collections in MongoDB are equivalent to tables in relational databases. They store a group of documents. Here you'll find commands to list, create, rename, and drop collections within your current database.",
        commands: [
            { title: 'Show all collections', code: 'show collections' },
            { title: 'Create a collection', code: 'db.createCollection("users")' },
            { title: 'Drop a collection', code: 'db.users.drop()' },
            { title: 'Rename a collection', code: 'db.users.renameCollection("app_users")' },
        ],
    },
    {
        id: 'crud',
        title: 'CRUD Operations',
        intro: 'CRUD (Create, Read, Update, Delete) operations are the four basic functions of persistent storage. This section details how to insert, query, modify, and remove documents from your collections. Mastering these commands is fundamental to working with data in MongoDB.',
        subSections: [
            {
                title: 'Create (Insert) Documents',
                commands: [
                    { title: 'Insert a single document', code: 'db.users.insertOne({ username: "alice", age: 30, city: "New York" })' },
                    { title: 'Insert multiple documents', code: 'db.users.insertMany([\n   { username: "bob", age: 25, city: "Paris" },\n   { username: "charlie", age: 35, city: "London" }\n])' },
                ]
            },
            {
                title: 'Read (Query) Documents',
                commands: [
                    { title: 'Find all documents', code: 'db.users.find()' },
                    { title: 'Find documents where age is 25', code: 'db.users.find({ age: 25 })' },
                ]
            },
            {
                title: 'Update Documents',
                commands: [
                    { title: 'Update a single document', code: 'db.users.updateOne(\n   { username: "alice" },\n   { $set: { age: 31 } }\n)' },
                    { title: 'Update multiple documents', code: 'db.users.updateMany(\n   { city: "New York" },\n   { $set: { country: "USA" } }\n)' },
                ]
            },
            {
                title: 'Delete Documents',
                commands: [
                    { title: 'Delete a single document', code: 'db.users.deleteOne({ username: "charlie" })' },
                    { title: 'Delete multiple documents', code: 'db.users.deleteMany({ city: "London" })' },
                ]
            }
        ]
    },
    {
        id: 'indexing',
        title: 'Indexing',
        intro: 'Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e., scan every document in a collection, to select those documents that match the query statement. This section shows how to create and manage various types of indexes.',
        commands: [
            { title: 'Create an ascending index', code: 'db.users.createIndex({ username: 1 })' },
            { title: 'Create a compound index', code: 'db.users.createIndex({ city: 1, age: -1 })' },
            { title: 'List all indexes', code: 'db.users.getIndexes()' },
            { title: 'Drop a specific index', code: 'db.users.dropIndex("username_1")' },
        ],
    },
];

// --- Data for SQL Cheat Sheet ---
const sqlCheatSheetData = [
    {
        id: 'dql',
        title: 'Data Query Language (DQL)',
        intro: 'DQL commands are used for performing queries on the data within schema objects. The purpose of DQL commands is to get some schema relation based on the query passed to it.',
        commands: [
            { title: 'Select all columns', code: 'SELECT * FROM users;' },
            { title: 'Select specific columns', code: 'SELECT username, email FROM users;' },
            { title: 'Select with a filter', code: "SELECT * FROM users WHERE city = 'New York';" },
            { title: 'Select with ordering', code: 'SELECT * FROM users ORDER BY age DESC;' },
            { title: 'Select distinct values', code: 'SELECT DISTINCT city FROM users;' },
            { title: 'Select with a limit', code: 'SELECT * FROM users LIMIT 5;' },
            { title: 'Fetch first N rows', code: 'SELECT * FROM users FETCH FIRST 5 ROWS ONLY;' },
        ],
    },
    {
        id: 'dml',
        title: 'Data Manipulation Language (DML)',
        intro: 'DML commands are used to modify the database. It is responsible for all forms of changes in the database.',
        commands: [
            { title: 'Insert a new row', code: "INSERT INTO users (username, email, age, city) VALUES ('dave', 'dave@example.com', 42, 'Miami');" },
            { title: 'Update existing rows', code: "UPDATE users SET age = 43 WHERE username = 'dave';" },
            { title: 'Delete rows', code: "DELETE FROM users WHERE username = 'dave';" },
        ],
    },
    {
        id: 'ddl',
        title: 'Data Definition Language (DDL)',
        intro: 'DDL commands are used to define the database schema. It is a set of SQL commands that can be used to create, modify, and delete database structures but not data.',
        commands: [
            { title: 'Create a new table', code: 'CREATE TABLE products (\n  product_id INT PRIMARY KEY,\n  product_name VARCHAR(255),\n  price DECIMAL(10, 2),\n  seller_id INT\n);' },
            { title: 'Alter a table (add column)', code: 'ALTER TABLE products ADD stock_quantity INT;' },
            { title: 'Drop a table', code: 'DROP TABLE products;' },
            { title: 'Create an index', code: 'CREATE INDEX idx_username ON users (username);' },
            { title: 'Drop an index', code: 'DROP INDEX idx_username;' },
        ],
    },
    {
        id: 'operators',
        title: 'Operators',
        intro: 'Operators are used in the WHERE clause to specify conditions.',
        commands: [
            { title: 'AND Operator', code: "SELECT * FROM users WHERE age > 25 AND city = 'New York';" },
            { title: 'OR Operator', code: "SELECT * FROM users WHERE city = 'London' OR city = 'Paris';" },
            { title: 'NOT Operator', code: "SELECT * FROM users WHERE NOT city = 'New York';" },
            { title: 'LIKE Operator (Pattern Matching)', code: "SELECT * FROM users WHERE username LIKE 'a%';" },
            { title: 'BETWEEN Operator', code: "SELECT * FROM users WHERE age BETWEEN 20 AND 30;" },
            { title: 'IS NULL Operator', code: "SELECT * FROM users WHERE email IS NULL;" },
            { title: 'IN Operator', code: "SELECT * FROM users WHERE city IN ('London', 'Paris', 'Tokyo');" },
        ]
    },
    {
        id: 'joins',
        title: 'JOIN Clauses',
        intro: 'JOIN clauses are used to combine rows from two or more tables, based on a related column between them.',
        commands: [
            { title: 'Inner Join', code: 'SELECT u.username, p.product_name FROM users u\nINNER JOIN products p ON u.user_id = p.seller_id;' },
            { title: 'Left Join', code: 'SELECT u.username, p.product_name FROM users u\nLEFT JOIN products p ON u.user_id = p.seller_id;' },
            { title: 'Right Join', code: 'SELECT u.username, p.product_name FROM users u\nRIGHT JOIN products p ON u.user_id = p.seller_id;' },
            { title: 'Full Outer Join', code: 'SELECT u.username, p.product_name FROM users u\nFULL OUTER JOIN products p ON u.user_id = p.seller_id;' },
            { title: 'Cross Join', code: 'SELECT * FROM users\nCROSS JOIN products;' },
        ],
    },
    {
        id: 'aggregation',
        title: 'Aggregation & Grouping',
        intro: 'Aggregate functions perform a calculation on a set of values and return a single value. They are often used with the GROUP BY clause.',
        commands: [
            { title: 'Count rows', code: 'SELECT COUNT(*) FROM users;' },
            { title: 'Sum values', code: 'SELECT SUM(price) FROM products;' },
            { title: 'Average values', code: 'SELECT AVG(age) FROM users;' },
            { title: 'Find min/max values', code: 'SELECT MIN(price), MAX(price) FROM products;' },
            { title: 'Group by', code: 'SELECT city, COUNT(*) FROM users GROUP BY city;' },
            { title: 'Having clause', code: 'SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) > 1;' },
        ],
    },
    {
        id: 'functions',
        title: 'Functions',
        intro: 'SQL functions are used to perform operations on data. They can be used to manipulate strings, numbers, dates, and more.',
        commands: [
            { title: 'Create a Function (Scalar)', code: 'CREATE FUNCTION GetUserFullName(@user_id INT)\nRETURNS VARCHAR(100)\nAS\nBEGIN\n    DECLARE @full_name VARCHAR(100);\n    SELECT @full_name = CONCAT(username, \' (ID: \', user_id, \')\') FROM users WHERE user_id = @user_id;\n    RETURN @full_name;\nEND;' },
            { title: 'Call a Scalar Function', code: 'SELECT dbo.GetUserFullName(1);' },
            { title: 'String - UPPER()', code: "SELECT UPPER(username) FROM users;" },
            { title: 'String - LOWER()', code: "SELECT LOWER(username) FROM users;" },
            { title: 'String - LENGTH()', code: "SELECT LENGTH(username) FROM users;" },
            { title: 'String - CONCAT()', code: "SELECT CONCAT(username, ' from ', city) FROM users;" },
            { title: 'Numeric - ROUND()', code: "SELECT ROUND(price) FROM products;" },
            { title: 'Date - NOW()', code: "SELECT NOW();" },
            { title: 'Utility - COALESCE()', code: "SELECT COALESCE(email, 'No email provided') FROM users;" },
        ],
    },
    {
        id: 'advanced_queries',
        title: 'Advanced Queries',
        intro: 'Advanced SQL features for complex data manipulation and automation.',
        subSections: [
            {
                title: 'Window Functions',
                commands: [
                    { title: 'ROW_NUMBER()', code: 'SELECT username, age, ROW_NUMBER() OVER (ORDER BY age DESC) as row_num FROM users;' },
                    { title: 'RANK()', code: 'SELECT username, age, RANK() OVER (ORDER BY age DESC) as rank FROM users;' },
                    { title: 'DENSE_RANK()', code: 'SELECT username, age, DENSE_RANK() OVER (ORDER BY age DESC) as dense_rank FROM users;' },
                    { title: 'NTILE()', code: 'SELECT username, age, NTILE(4) OVER (ORDER BY age DESC) as quartile FROM users;' },
                    { title: 'LAG()', code: 'SELECT username, age, LAG(age, 1) OVER (ORDER BY age) as previous_age FROM users;' },
                    { title: 'LEAD()', code: 'SELECT username, age, LEAD(age, 1) OVER (ORDER BY age) as next_age FROM users;' },
                ]
            },
            {
                title: 'Subqueries',
                commands: [
                    { title: 'Subquery in WHERE clause', code: "SELECT username FROM users WHERE user_id IN (SELECT seller_id FROM products WHERE price > 100);" },
                ]
            },
            {
                title: 'Stored Procedures',
                commands: [
                    { title: 'Create Procedure', code: 'CREATE PROCEDURE GetUsersByCity @City NVARCHAR(50)\nAS\nBEGIN\n    SELECT * FROM users WHERE city = @City;\nEND;' },
                    { title: 'Execute Procedure', code: "EXEC GetUsersByCity @City = 'London';" },
                ]
            },
            {
                title: 'Triggers',
                commands: [
                    { title: 'Create Trigger', code: 'CREATE TRIGGER after_user_insert\nAFTER INSERT ON users\nFOR EACH ROW\nBEGIN\n   INSERT INTO user_logs(user_id, action)\n   VALUES(NEW.user_id, \'inserted\');\nEND;' },
                ]
            }
        ]
    },
    {
        id: 'transactions',
        title: 'Transactions',
        intro: 'Transactions are used to bundle a set of operations into a single execution unit.',
        commands: [
            { title: 'Begin Transaction', code: 'BEGIN TRANSACTION;' },
            { title: 'Commit Transaction', code: 'COMMIT;' },
            { title: 'Rollback Transaction', code: 'ROLLBACK;' },
            { title: 'Transaction with Savepoint', code: 'BEGIN TRANSACTION;\n   UPDATE users SET age = 31 WHERE username = \'alice\';\n   SAVEPOINT before_delete;\n   DELETE FROM users WHERE username = \'bob\';\n   ROLLBACK TO before_delete;\nCOMMIT;' },
        ]
    }
];

// --- Data for PostgreSQL Cheat Sheet ---
const postgresqlCheatSheetData = [
    {
        id: 'psql_meta',
        title: 'psql Meta-Commands',
        intro: 'These are special commands for the psql command-line utility, not SQL commands. They begin with a backslash.',
        commands: [
            { title: 'List all databases', code: '\\l' },
            { title: 'Connect to a database', code: '\\c my_database' },
            { title: 'List all tables', code: '\\dt' },
            { title: 'Describe a table', code: '\\d users' },
            { title: 'List all users', code: '\\du' },
            { title: 'Quit psql', code: '\\q' },
        ],
    },
    {
        id: 'db_management',
        title: 'Database Management',
        intro: 'SQL commands for creating, altering, and dropping databases.',
        commands: [
            { title: 'Create a database', code: 'CREATE DATABASE my_database;' },
            { title: 'Drop a database', code: 'DROP DATABASE my_database;' },
        ],
    },
    {
        id: 'table_management',
        title: 'Table Management',
        intro: 'Commands for managing tables within a database.',
        commands: [
            { title: 'Create a table with data types', code: 'CREATE TABLE users (\n  user_id SERIAL PRIMARY KEY,\n  username VARCHAR(50) UNIQUE NOT NULL,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);' },
            { title: 'Add a column', code: 'ALTER TABLE users ADD COLUMN email VARCHAR(255);' },
            { title: 'Drop a column', code: 'ALTER TABLE users DROP COLUMN email;' },
            { title: 'Rename a table', code: 'ALTER TABLE users RENAME TO app_users;' },
        ],
    },
    {
        id: 'user_management',
        title: 'User & Role Management',
        intro: 'Commands for managing database users and their permissions.',
        commands: [
            { title: 'Create a user/role', code: "CREATE ROLE dave WITH LOGIN PASSWORD 'password123';" },
            { title: 'Grant privileges on a table', code: 'GRANT SELECT, INSERT, UPDATE ON users TO dave;' },
            { title: 'Grant all privileges on a database', code: 'GRANT ALL PRIVILEGES ON DATABASE my_database TO dave;' },
            { title: 'Revoke privileges', code: 'REVOKE SELECT ON users FROM dave;' },
        ],
    },
    {
        id: 'functions_procedures',
        title: 'Functions & Procedures',
        intro: 'Reusable blocks of code that can be executed on demand.',
        commands: [
            { title: 'Create a Function', code: 'CREATE OR REPLACE FUNCTION get_user_count_by_city(city_name VARCHAR)\nRETURNS INT\nLANGUAGE plpgsql\nAS $$\nDECLARE\n    user_count INTEGER;\nBEGIN\n   SELECT COUNT(*) INTO user_count FROM users WHERE city = city_name;\n   RETURN user_count;\nEND;$$;' },
            { title: 'Call a Function', code: "SELECT get_user_count_by_city('London');" },
            { title: 'Create a Procedure', code: 'CREATE OR REPLACE PROCEDURE update_user_age(p_user_id INT, new_age INT)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n    UPDATE users SET age = new_age WHERE user_id = p_user_id;\nEND;$$;' },
            { title: 'Call a Procedure', code: 'CALL update_user_age(1, 31);' },
        ],
    },
];

const allData = {
    mongo: mongoCheatSheetData,
    sql: sqlCheatSheetData,
    postgres: postgresqlCheatSheetData
};


// --- Reusable Components ---

const CodeBlock = ({ code }) => {
    return (
        <div className="code-block bg-slate-800 text-slate-200 rounded-lg p-3 relative">
            <pre><code className="text-sm">{code}</code></pre>
        </div>
    );
};

const CommandCard = ({ title, code, description }) => (
    <div className="command-card bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <h3 className="font-semibold mb-2 text-slate-900">{title}</h3>
        {description && <p className="text-sm text-slate-500 mb-2">{description}</p>}
        <CodeBlock code={code} />
    </div>
);

const CommandSubSection = ({ title, commands }) => (
     <div className="command-card bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4">
        <h3 className="text-lg font-semibold mb-3 text-slate-900">{title}</h3>
        <div className="space-y-3">
            {commands.map(cmd => (
                <div key={cmd.title}>
                    <h4 className="font-medium mb-1 text-slate-800">{cmd.title}</h4>
                    <CodeBlock code={cmd.code} />
                </div>
            ))}
        </div>
    </div>
);

const CommandSection = ({ id, title, intro, commands, subSections }) => (
    <section id={id} className="command-section scroll-mt-16">
        <h2 className="text-xl font-bold border-b border-slate-300 pb-1 mb-3 text-slate-900">{title}</h2>
        <div className="intro-text text-slate-600 text-sm mb-4">{intro}</div>
        {commands && (
            <div className={`grid grid-cols-1 ${commands.length > 1 ? 'lg:grid-cols-2' : ''} gap-4`}>
                {commands.map(cmd => <CommandCard key={cmd.title} {...cmd} />)}
            </div>
        )}
        {subSections && (
            <div className="space-y-4">
                {subSections.map(sub => <CommandSubSection key={sub.title} {...sub} />)}
            </div>
        )}
    </section>
);

const Sidebar = ({ sections, activeSheet, setActiveSheet }) => {
    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-3 md:fixed md:h-full flex flex-col">
            <div className="mb-4">
                <h1 className="text-lg font-bold text-slate-900 mb-3">DB Cheat Sheet by Harsh</h1>
                <div className="flex bg-slate-100 rounded-lg p-1 text-xs">
                    <button 
                        onClick={() => setActiveSheet('mongo')}
                        className={`flex-1 py-1 rounded-md transition-colors ${activeSheet === 'mongo' ? 'bg-white shadow text-teal-600 font-semibold' : 'text-slate-600'}`}
                    >
                        MongoDB
                    </button>
                    <button 
                        onClick={() => setActiveSheet('sql')}
                        className={`flex-1 py-1 rounded-md transition-colors ${activeSheet === 'sql' ? 'bg-white shadow text-teal-600 font-semibold' : 'text-slate-600'}`}
                    >
                        SQL
                    </button>
                    <button 
                        onClick={() => setActiveSheet('postgres')}
                        className={`flex-1 py-1 rounded-md transition-colors ${activeSheet === 'postgres' ? 'bg-white shadow text-teal-600 font-semibold' : 'text-slate-600'}`}
                    >
                        PostgreSQL
                    </button>
                </div>
            </div>
            <nav className="space-y-1 flex-1">
                {sections.map(section => (
                    <a 
                        key={section.id} 
                        href={`#${section.id}`} 
                        onClick={(e) => handleNavClick(e, section.id)}
                        className="block text-slate-600 hover:text-teal-600 font-medium text-sm py-1"
                    >
                        {section.title}
                    </a>
                ))}
            </nav>
        </aside>
    );
};

const Header = ({ searchTerm, setSearchTerm }) => (
    <header className="mb-6 sticky top-0 bg-slate-50/80 backdrop-blur-sm z-20 py-2.5">
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search commands..."
                className="w-full pl-9 pr-4 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
    </header>
);

const ReferenceTable = () => (
    <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-slate-900">Reference Tables</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-semibold mb-2 text-slate-800">users</h3>
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-4 py-2">user_id</th>
                            <th scope="col" className="px-4 py-2">username</th>
                            <th scope="col" className="px-4 py-2">age</th>
                            <th scope="col" className="px-4 py-2">city</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">alice</td>
                            <td className="px-4 py-2">30</td>
                            <td className="px-4 py-2">New York</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">bob</td>
                            <td className="px-4 py-2">25</td>
                            <td className="px-4 py-2">Paris</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">charlie</td>
                            <td className="px-4 py-2">35</td>
                            <td className="px-4 py-2">London</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                <h3 className="font-semibold mb-2 text-slate-800">products</h3>
                <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="px-4 py-2">product_id</th>
                            <th scope="col" className="px-4 py-2">product_name</th>
                            <th scope="col" className="px-4 py-2">price</th>
                            <th scope="col" className="px-4 py-2">seller_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-2">101</td>
                            <td className="px-4 py-2">Laptop</td>
                            <td className="px-4 py-2">1200.00</td>
                            <td className="px-4 py-2">1</td>
                        </tr>
                        <tr className="bg-slate-50 border-b">
                            <td className="px-4 py-2">102</td>
                            <td className="px-4 py-2">Mouse</td>
                            <td className="px-4 py-2">25.00</td>
                            <td className="px-4 py-2">2</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-4 py-2">103</td>
                            <td className="px-4 py-2">Keyboard</td>
                            <td className="px-4 py-2">75.00</td>
                            <td className="px-4 py-2">1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);


// --- Main App Component ---

export default function App() {
    const [activeSheet, setActiveSheet] = useState('mongo');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(allData[activeSheet]);

    useEffect(() => {
        setSearchTerm(''); // Reset search term when switching sheets
        setFilteredData(allData[activeSheet]);
    }, [activeSheet]);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const currentSheetData = allData[activeSheet];
        
        if (!lowercasedFilter) {
            setFilteredData(currentSheetData);
            return;
        }

        const filtered = currentSheetData.map(section => {
            let commands = [];
            let subSections = [];

            if (section.commands) {
                commands = section.commands.filter(cmd => 
                    cmd.title.toLowerCase().includes(lowercasedFilter) || 
                    cmd.code.toLowerCase().includes(lowercasedFilter)
                );
            }

            if (section.subSections) {
                subSections = section.subSections.map(sub => {
                    const filteredCommands = sub.commands.filter(cmd => 
                        cmd.title.toLowerCase().includes(lowercasedFilter) || 
                        cmd.code.toLowerCase().includes(lowercasedFilter)
                    );
                    return { ...sub, commands: filteredCommands };
                }).filter(sub => sub.commands.length > 0);
            }
            
            return { ...section, commands, subSections };
        }).filter(section => (section.commands && section.commands.length > 0) || (section.subSections && section.subSections.length > 0));

        setFilteredData(filtered);
    }, [searchTerm, activeSheet]);

    return (
        <>
            <style>{`
                body { 
                    font-family: 'Inter', sans-serif; 
                    background-color: #f8fafc;
                }
                .command-card { transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; }
                .code-block pre {
                    white-space: pre-wrap;
                    word-break: break-all;
                }
                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: #e2e8f0; }
                ::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #64748b; }
            `}</style>
            
            <div className="flex flex-col md:flex-row min-h-screen text-slate-800">
                <Sidebar 
                    sections={allData[activeSheet]} 
                    activeSheet={activeSheet} 
                    setActiveSheet={setActiveSheet}
                />
                <main className="flex-1 md:ml-64 p-3 sm:p-4">
                    <Header 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                    />
                    <ReferenceTable />
                    <div id="command-container" className="space-y-6">
                        {filteredData.length > 0 ? (
                            filteredData.map(section => <CommandSection key={section.id} {...section} />)
                        ) : (
                            <div className="text-center text-slate-500 py-8">
                                <h3 className="text-md font-semibold">No commands found</h3>
                                <p className="text-sm">Try adjusting your search term.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
