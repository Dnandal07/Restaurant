var ViewBill = [];
$("#add").click(function () {
  var name = "";
  name = $("#name1").val();
  $(".left_data").empty();
  if ($("#name1").val() != '' && $("#mobile_number").val() != '') {
    $(".left_data").append(`<div class="modal" id="myModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">DN's Restaurant Menu</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        <div class="dropdown text-center">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownmodal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Item
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" onclick="BurgerItem()" href="#">Burger</a>
          <a class="dropdown-item" onclick="SandwichItem()" href="#">Sandwich</a>
          <a class="dropdown-item" onclick="JuiceItem()" href="#">Juice</a>
        </div>
        </div>
        <div class="item_type text-center">
          <input type="text" class="mt-2" name="typename" id="item_type_name" placeholder="Name">
        </div>
        <div class="item_type text-center">
          <input type="number" min="0" class="mt-2" name="typeprice" id="item_type_price" placeholder="Price">
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="Submit()" data-dismiss="modal">Submit</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`)
  }
  else {
    alert("Name and Mobile no. are mandatory");
  }
})

function BurgerItem() {
  $("#dropdownmodal").text('Burger');
}

function SandwichItem() {
  $("#dropdownmodal").text('Sandwich');
}

function JuiceItem() {
  $("#dropdownmodal").text('Juice');
}

var it = [];
var iobj = {};

function Submit() {
  $("#item_table").empty();
  iobj.item = $("#dropdownmodal").text();
  iobj.type = $("#item_type_name").val();
  iobj.price = $("#item_type_price").val();
  it.push(iobj);
  iobj = {};
  $("#dropdownmodal").text('Item');
  $("#item_type_name").val('');
  $("#item_type_price").val('');
  it.forEach(function (element, index) {
    AppendTable(index);
  })
  $(".Sandwich").hide();
  $(".Juice").hide();
}

$("#ib").click(function () {
  $(".Sandwich").hide();
  $(".Juice").hide();
  $(".Burger").show();
})


$("#is").click(function () {
  $(".Sandwich").show();
  $(".Juice").hide();
  $(".Burger").hide();
})

$("#ij").click(function () {
  $(".Sandwich").hide();
  $(".Juice").show();
  $(".Burger").hide();
})

function AppendTable(index) {
  $("#item_table").append(`<tr class="${it[index].item}">
  <td><input type="checkbox" name="check" id="cb${index}" onclick="Check(${index})"></td>
  <td>${it[index].item}</td>
  <td>${it[index].type}</td>
  <td><input type="number" min="0" name="quantity" id="qnt${index}" min="0" max="20" readonly></td>
  <td id="price${index}">${it[index].price}</td>
  </tr>`)
}

function Check(index) {
  var b = $("#cb" + index).prop("checked");
  if (b == true) {
    $("#qnt" + index).prop('readonly', false);
    $("#qnt" + index).val('1');
  }
  else {
    $("#qnt" + index).prop('readonly', true);
    $("#qnt" + index).val('');
  }
}

var bit = [];
var bobj = {};
$("#generate_bill").click(function () {
  bit = [];
  $(".bill_table").empty();
  $(".right_data").empty();
  it.forEach(function (element, index) {
    if ($("#cb" + index).prop('checked') == true) {
      bobj.item = it[index].item;
      bobj.type = it[index].type;
      bobj.price = it[index].price;
      bobj.quantity = $("#qnt" + index).val();
      bit.push(bobj);
      bobj = {};
    }
    $("#cb" + index).prop('checked', false);
    $("#qnt" + index).val('');
  })

  var bname = $("#name1").val();
  var bmobile = $("#mobile_number").val();
  $(".right_data").append(`<div class="card">
  <div class="card-body">
  <h3 class="text-center font-weight-bold"> DN's Restaurant </h3>
  <h5 class="text-center"> 1215/55 M Tower Sector 91, </h5>
  <h5 class="text-center"> S.A.S. Nagar (Punjab) </h5>
  <div class="row mt-3">
    <div class="col-3 text-right">
        <h6>Name:</h6>
    </div>
    <div class="col-9">
        <h6>${bname}</h6>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-3 text-right">
        <h6>Mobile No:</h6>
    </div>
    <div class="col-9">
        <h6>${bmobile}</h6>
    </div>
  <div class="col-12">
    <table class="table table-striped bg-light">
        <thead>
            <th>Item</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
        </thead>
        <tbody class="bill_table">

        </tbody>
    </table>
  </div>
  </div>
  </div>
  </div>`);
  var total = 0;
  bit.forEach(function (element, index) {
    var pr = bit[index].price;
    var qn = bit[index].quantity;
    var am = pr * qn;
    $(".bill_table").append(`<tr>
    <td>${bit[index].item}</td>
    <td>${bit[index].type}</td>
    <td>${bit[index].quantity}</td>
    <td>${bit[index].price}</td>
    <td>${am}</td>
    </tr>`);
    total = total + am;
  })
  $(".bill_table").append(`<tr>
  <td colspan="4"> Total </td>
  <td> ${total} </td>`);
  $("#name1").val('');
  $("#mobile_number").val('');
  var a = $(".right_data").html();
  ViewBill.push(a);
})

$("#view_bill").click(function(){
  $(".right_data").append(`<div class="modal" id="myModal1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">All Bills</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body modalbody">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
  </div>`)
  var dataView="";
   ViewBill.forEach(function (element, index) {
    dataView+=ViewBill[index];
  })
$(".modalbody").append(dataView);
})
