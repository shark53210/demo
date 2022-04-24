$(document).ready(function () {
    // alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.getall();
    // 新增按鈕
    $("#addbutton").on("click",function () {
        $("#dialog-addconfirm").fadeIn(3000).dialog({
            resizable: true,
            height: $(window).height() * 0.4, // dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱 
                //^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$
                "新增": function (e) {
                    if($("#addcnname").val().trim() ==""){
                        alert("中文姓名不能空白")
                    }else if($("#addphone").val() ==""){
                        alert("手機不能空白")
                    }else if(!$("#addphone").val().match(/^(09)[0-9]{8}$/)){
                        alert("請輸入正確手機號")
                    }else if($("#addphone").val().length !=10){
                        alert("請輸入正確手機號")
                    }else if($("#addemail").val().trim() ==""){
                        alert("信箱不能空白")
                    }else if(!$("#addemail").val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
                        alert("信箱格式不正確")
                    }else if($("#addsex").val() ==""){
                        alert("性別不能空白")
                    }else{
                        // alert("22")

                        var url = "ajax/ajaxCard";
                        var cnname = $("#addcnname").val();
                        var enname = $("#addenname").val();
                        var sex = $('input:radio:checked[name="addsex"]').val();
                        var phone = $("#addphone").val();
                        var email = $("#addemail").val();
                        var ajaxobj = new AjaxObject(url, 'json');
                        ajaxobj.cnname = cnname;
                        ajaxobj.enname = enname;
                        ajaxobj.sex = sex;
                        ajaxobj.phone = phone;
                        ajaxobj.email = email;
                        ajaxobj.add(ajaxobj);
                        e.preventDefault(); // avoid to execute the actual submit of the form.

                    }
                },
                "重新填寫": function () {
                    $("#addform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        })
    });
    // 搜尋按鈕
    $("#searchbutton").click(function () {
        $("#dialog-searchconfirm").dialog({
            resizable: true,
            height: $(window).height() * 0.4, // dialog視窗度
            width: $(window).width() * 0.4,
            modal: true,
            buttons: {
                // 自訂button名稱
                "搜尋": function (e) {
                    var url = "ajax/ajaxCard";
                    // var data = $("#searchform").serialize();
                    var cnname = $("#secnname").val();
                    var enname = $("#seenname").val();
                    var sex = $('input:radio:checked[name="sesex"]').val();
                    var phone = $("#addphone").val();
                    var email = $("#addemail").val();
                    var ajaxobj = new AjaxObject(url, 'json');
                    ajaxobj.cnname = cnname;
                    ajaxobj.enname = enname;
                    ajaxobj.sex = sex;
                    ajaxobj.phone = phone;
                    ajaxobj.email = email;
                    ajaxobj.search();

                    e.preventDefault(); // avoid to execute the actual submit of the form.
                },
                "重新填寫": function () {

                    $("#searchform")[0].reset();
                },
                "取消": function () {
                    $(this).dialog("close");
                }
            }
        });
    })
    // 修改鈕
    $("#cardtable").on('click', function (e) {
        if(e.target.nodeName !== "BUTTON")return;
        var ajaxobj = new AjaxObject(url, 'json');
        var getTr = e.target.closest("tr");
        if(e.target.classList.contains("modifybutton")){
            ajaxobj.modify_get(getTr);
        }else{
            $("#checkDel").on('click', function () {
                getTr.remove();
            })   
        }

        //console.log(e.target.closest("tr"));
        // console.log(getTr);
    })
    // const elemCardTable = document.querySelector("#cardtable");
    // elemCardTable.addEventListener("click",function(e){
    //     console.log(e.target.closest("tr"));
    // },true)
    //彈窗確認checkDel
    // $("#checkDel").on('click', function (e) {
    //     //var deleteid = $(this).attr('id');
    //     var deleteid = $("#deletebutton35")
    //     var url = "ajax/ajaxCard";
    //     var ajaxobj = new AjaxObject(url, 'json');
    //     ajaxobj.id = deleteid;
    //     ajaxobj.delete();
        // console.log(e.target.closest("tr"));
        // $("#exampleModal").remove();
        // $(".modal-backdrop").remove();
        // $("#exampleModal").hide().attr("style", "display:none");
        // $(".modal-backdrop").hide().attr("style", "display:none");

    //})

    // 自適應視窗
    $(window).resize(function () {
        var wWidth = $(window).width();
        var dWidth = wWidth * 0.4;
        var wHeight = $(window).height();
        var dHeight = wHeight * 0.4;
        $("#dialog-confirm").dialog("option", "width", dWidth);
        $("#dialog-confirm").dialog("option", "height", dHeight);
    });
});

function refreshTable(data) {
    // var HTML = '';
    // console.log(data);
    // $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        let str="";
        var strsex = '';
        if (item.sex == 0)
        strsex = '男';
        else
        strsex = '女';
            str += `
                <tr>
                    <td data-bs-toggle='tooltip' title=[${strsex}](${item.cnname}){${item.enname}} >${item.cnname}</td>
                    <td>${item.enname}</td>
                    <td>${strsex}</td>
                    <td><button id="modifybutton${item.s_sn||"35"}" class="modifybutton" type="button" style="font-size:16px;font-weight:bold;" >修改 <span class="glyphicon glyphicon-list-alt"></span></button></td>
                    <td><button id="deletebutton${item.s_sn||"35"}" class="deletebutton" type="button" style="font-size:16px;font-weight:bold;" data-bs-toggle="modal" data-bs-target="#exampleModal">刪除 <span class="glyphicon glyphicon-trash"></span></button></td>
                    <td id="clickPhone" onclick="tdclick();" data-bs-toggle='popover' title=${item.phone.substring(0,4)}-${item.phone.substring(4,7)}-${item.phone.substring(7,10)} >${item.phone}</td>
                    <td>${item.email}</td>
                </tr>
            `;
        // var row = $("<tr></tr>");data-bs-toggle="modal" data-bs-target="#exampleModal"
        // row.append($(`<td data-bs-toggle='tooltip' title=[${strsex}](${item.cnname}){${item.enname}} ></td>`).html(item.cnname));
        // row.append($("<td></td>").html(item.enname));
        // row.append($("<td></td>").html(strsex));
        // row.append($("<td></td>").html('<button id="modifybutton' + item.s_sn + '" class="modifybutton" style="font-size:16px;font-weight:bold;" >修改 <span class="glyphicon glyphicon-list-alt"></span></button>'));
        // row.append($("<td></td>").html('<button id="deletebutton' + item.s_sn + '" class="deletebutton" style="font-size:16px;font-weight:bold;" data-bs-toggle="modal" data-bs-target="#exampleModal">刪除 <span class="glyphicon glyphicon-trash"></span></button>'));
        // // row.append($(`<td id="clickPhone" onclick="tdclick();" data-bs-container="body" data-bs-toggle='popover' title=${(item.phone).substring(0,4)}-${(item.phone).substring(4,7)}-${(item.phone).substring(7,10)}  ></td>`).html(item.phone));
        // row.append($(`<td id="clickPhone" onclick="tdclick();" data-bs-toggle='popover' title=${(item.phone).substring(0,4)}-${(item.phone).substring(4,7)}-${(item.phone).substring(7,10)}  ></td>`).html(item.phone));
        // row.append($("<td></td>").html(item.email));
        //$("#cardtable").append(row);
        $("#hoverStyle").append(str);

    });
}
//點擊手機彈窗
function tdclick (){
    // console.log("object");
    $(function () { $("[data-bs-toggle='popover']").popover(); });
}

function initEdit(response) {
    console.log(response[0]);
    var modifyid = $("#cardtable").attr('id').substring(12);
    // $("#mocnname").val(response[0].cnname);
    // $("#moenname").val(response[0].enname);
    $("#mocnname").val(response[0].innerHTML);
    $("#moenname").val(response[1].innerHTML);

    if (response[2].innerHTML.sex == 0) {
        $("#modifyman").prop("checked", true);
        $("#modifywoman").prop("checked", false);
    } else {
        $("#modifyman").prop("checked", false);
        $("#modifywoman").prop("checked", true);
    }
    $("#mophone").val(response[5].innerHTML);
    $("#moemail").val(response[6].innerHTML);
    $("#modifysid").val(modifyid);
    $("#dialog-modifyconfirm").dialog({
        resizable: true,
        height: $(window).height() * 0.4, // dialog視窗度
        width: $(window).width() * 0.4,
        modal: true,
        buttons: {
            // 自訂button名稱
            "修改": function (e) {
                // $("#modifyform").submit();
                var url = "ajax/ajaxCard";
                var cnname = $("#mocnname").val();
                var enname = $("#moenname").val();
                var sex = $('input:radio:checked[name="mosex"]').val();
                var phone = $("#mophone").val();
                var email = $("#moemail").val();
                var ajaxobj = new AjaxObject(url, 'json');
                ajaxobj.cnname = cnname;
                ajaxobj.enname = enname;
                ajaxobj.sex = sex;
                ajaxobj.phone = phone;
                ajaxobj.email = email;
                ajaxobj.id = modifyid;
                ajaxobj.modify(ajaxobj,response);

                e.preventDefault(); // avoid to execute the actual submit of the form.
            },
            "重新填寫": function () {
                $("#modifyform")[0].reset();
            },
            "取消": function () {
                $(this).dialog("close");
            }
        },
        error: function (exception) {
            alert('Exeption:' + exception);
        }
    }); 
}

/**
 * 
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
    this.url = url;
    this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname = '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.phone = '';
AjaxObject.prototype.email = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}
AjaxObject.prototype.getall = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘1","enname":"Peter","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0912345678","email":"abc@abc.com"}]';
    refreshTable(JSON.parse(response));
}
AjaxObject.prototype.add = function (res,arr=[]) {
    // response = '[{"s_sn":"35","cnname":"邱小甘2","enname":"Peter","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"52","cnname":"新增帳號","enname":"NewAccount","sex":"1","phone":"0912345678","email":"abc@abc.com"}]';
    // console.log(res);
    arr.push(res)
    refreshTable(arr); 
    // refreshTable(JSON.parse(response));
    $("#dialog-addconfirm").dialog("close");
}
AjaxObject.prototype.modify = function (obj,arr,ARR=[]) {
    // response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0912345678","email":"abc@abc.com"}]';
    // refreshTable(JSON.parse(response));
    // refreshTable(obj);
    // console.log(ARR);
    arr[0].innerText= obj.cnname;
    arr[1].innerText=obj.enname;
    arr[2].innerText=obj.sex;
    arr[5].innerText=obj.phone;
    arr[6].innerText=obj.email;
    $("#dialog-modifyconfirm").dialog("close");
}
AjaxObject.prototype.modify_get = function (obj) {
    // response = '[{"s_sn":"35","cnname":"邱小甘3","enname":"Peter","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0912345678","email":"abc@abc.com"}]';
    // initEdit(JSON.parse(response));
    initEdit(Array.from(obj.children));
}
AjaxObject.prototype.search = function () {
    response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0912345678","email":"abc@abc.com"}]';
    refreshTable(JSON.parse(response));
    $("#dialog-searchconfirm").dialog("close");
}
AjaxObject.prototype.delete = function () {
    // response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0912345678","email":"abc@abc.com"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0912345678","email":"abc@abc.com"}]';
    // refreshTable(JSON.parse(response));
    //refreshTable("");
}

// hover十字
hoverStyle.addEventListener('mouseover', event => {
    var arr = Array.from(event.target.parentNode.parentNode.children)
    var index = [...event.target.parentNode.children].indexOf(event.target)

    arr.forEach(i => Array.from(i.children).forEach(j => j.style.backgroundColor = null))
    arr.forEach(k => k.children[index].style.backgroundColor = 'rgb(255, 220, 155)')
}, false)
hoverStyle.addEventListener('mouseleave', event => {
    var arr = Array.from(event.target.children)
    arr.forEach(i => Array.from(i.children).forEach(j => j.style.backgroundColor = null))
}, false)