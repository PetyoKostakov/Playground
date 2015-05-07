var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    issues = {};

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

var file = __dirname + '/test-data.json';
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  issues = JSON.parse(data);
});

function getIssuesByPage(pageSize, pageNum) {
  sliceEnd = pageSize * pageNum,
  issuesTable = issues.issueTable.table,
  issuesPaginated = issuesTable.slice(sliceEnd - pageSize, sliceEnd);
  
  return issuesPaginated;
};

app.get('/issues', function (req, res) {
  console.log('app.get - /issues');

  res.json(issues.issueTable.table);
});

/*app.get('/issues', function (req, res) {
  console.log('app.get - /issues');
  
  var pageSize = req.query.per_page,
      pageNum = req.query.page,
      issuesPaginated;
  
  if (pageNum && pageSize) {
    issuesPaginated = getIssuesByPage(pageSize, pageNum);
  }

  res.json(issuesPaginated);
});*/

app.get('/splitApp', function (req, res) {
  console.log('app.get - /issues');
  var pageSize = req.query.per_page,
      pageNum = req.query.pageNumber,
      total = issues.issueTable.table.length;
  
  res.json({
    total: total,
    issues: getIssuesByPage(pageSize, pageNum)
  });
  
});

app.get('/issues/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  res.json(issues[id]);
});

// app.post('/issues', function (req, res) {
//   var issue = req.body;
//   issue.id = ++id;
//   issue[issues.id] = book;
//   res.json(issue);
// });
//
// app.put('/books/:id', function (req, res) {
//   var id = parseInt(req.params.id, 10);
//   issues[id] = req.body;
//   res.json(issues[id]);
// });
//
// app.delete('/books/:id', function (req, res) {
//   var id = parseInt(req.params.id, 10);
//   delete issues[id];
//   res.json(null);
// });

// app.post('/books/update', function (req, res) {
//   var changeset = req.body;
//
//   changeset.create = changeset.create.map(function (model) {
//     model.id = ++id;
//     books[model.id] = model;
//     return model;
//   });
//
//   changeset.update = changeset.update.map(function (model) {
//     books[model.id] = model;
//     return model;
//   });
//
//   changeset.delete = changeset.delete.forEach(function (model) {
//     delete books[model.id];
//   });
//
//   res.json(changeset);
// });

app.use(express.static('public'));

// app.get('*', function (req, res) {
//   console.log('app get', __dirname + '/app/index.html')
//   res.sendFile(__dirname + '/app/index.html');
// });


app.listen(3000);
console.log('App listen on port: 3000')
