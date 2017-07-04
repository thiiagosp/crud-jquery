var students = [
  {id: '1', name: 'Thiago Pereira', age: '22', cpf: '123.123.321-00'},
  {id: '2', name: 'Jabulani', age: '12', cpf: '121.363.221-10'}
];
var id;
$( document ).ready(function() {

  buttonsReady();

});

function buttonsReady() {
  $("#studentForm").submit(function(e) {
    e.preventDefault();

    if(!id) {
      id = generateId();
      var student = {
        id: id,
        name: $('#studentForm [name="name"]').val(),
        age: $('#studentForm [name="age"]').val(),
        cpf: $('#studentForm [name="cpf"]').val()
      }
      if(student.name) {
        students.push(student);
      }
    }
    else {
      var idx = getStudentidx(id);
      students[idx].name = $('#studentForm [name="name"]').val();
      students[idx].age = $('#studentForm [name="age"]').val();
      students[idx].cpf = $('#studentForm [name="cpf"]').val();
    }



    listStudents();
    clearForm();
    id = null;
  });

  $(".deleteStudent").click(function (e) {
    e.preventDefault();
    var studentId = $(this).parent('tr').attr('id');
    var idx = getStudentidx(studentId);
    if(idx) {
      students.splice(idx,1)
      // deleteStudent(id);
      $(this).parent('tr').remove();
    }

  });

  $(".editStudent").click(function (e) {
    e.preventDefault();
    id = $(this).parent('tr').attr('id');
    var student = getStudent(id);
    if(student) {
      $('#studentForm [name="name"]').val(student.name);
      $('#studentForm [name="age"]').val(student.age);
      $('#studentForm [name="cpf"]').val(student.cpf);
    }

  });
}


function listStudents() {
  $('#studentList tbody').remove();

  $('#studentList').append('<tbody></tbody>');
  var studentList = '';
  students.forEach(function(student) {
    studentList +=
    `<tr id="${student.id}">
    <td>${student.name}</td>
    <td>${student.age}</td>
    <td>${student.cpf}</td>
    <td class="editStudent center"><i class="fa fa-pencil"></i></td>
    <td class="deleteStudent center"><i class="fa fa-trash"></i></td>
    </tr>`
  });
  $("#studentList tbody").append(studentList);
  buttonsReady();
}

function getStudent(id) {
  return students[students.findIndex(item => item.id == id)];
}
function getStudentidx(id) {
  return students.findIndex(item => item.id == id);
}

function generateId () {
  var id =  Math.floor(Math.random() * 10000);
  students.forEach(function(student) {
    if(student.id == id) return false;
  });

  return id;
}

function clearForm() {
  $( '#studentForm' ).each(function(){
    this.reset();
  });
}
