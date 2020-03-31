import Mock from "mockjs";

var Random=Mock.Random;
//Mock.setup({timeout: 4000})

//辅导员————各个班级学生资料信息
Mock.mock('http://localhost:8080/graduation/studentView', {
	"stuInfo|10":[{"s_name":"@cname()",
				"sex|1":["男","女"],
				"classes|100000-999999":1,
				"telephone|1000000-9999999999":1,
				"address":"@city(true)",
				"QQ|100000-99999999999":1,
				"email":'@email',
				"s_id|+1":0,
				}]
});
//辅导员————班级列表
Mock.mock('http://localhost:8080/graduation/classView', {
	"classNumber|6":["@natural(100000,999999)"]
});
//辅导员————事务列表
Mock.mock("http://localhost:8080/graduation/getTeaAllAffair", {
	"TeaAllAffair|10":[{
		"title":"@ctitle(15,20)",
		"mes_id|+1":0,
		"status|1":[1,2]
	}]
});
//学生————事务列表
Mock.mock("http://localhost:8080/graduation/getStuAllAffair", {
	"TeaAllAffair|10":[{
		"title":"@ctitle(15,20)",
		"mes_id|+1":0,
		"status|1":[1,2]
	}]
});

//辅导员————新闻消息查询
Mock.mock("http://localhost:8080/graduation/teaNews", {
	"teaNews|10":[{
		"title":"@ctitle(15,20)",
		"newsId|+1":0	}]
});
//学生————新闻消息查询
Mock.mock("http://localhost:8080/graduation/getNews", {
	"getNews|10":[{
		"title":"@ctitle(15,20)",
		"newsId|+1":0	}]
});

//辅导员————文件列表
Mock.mock("http://localhost:8080/graduation/getTeaFile", {
	"getTeaFile|10":[{
		"fileName":"@ctitle(10,15)",
		"fileId|+1":0,
		"fileURL":"@word(6,10)"
	}]
});

//学生————文件列表
Mock.mock("http://localhost:8080/graduation/getFileView", {
	"getTeaFile|10":[{
		"fileName":"@ctitle(10,15)",
		"fileId|+1":0,
		"fileURL":"@word(6,10)"
	}]
});

Mock.mock("http://localhost:8080/graduation/getTeaInfo", {
	"t_name":"@cname",
	"sex|1":["男","女"],
	"telephone|1000000-9999999999":1,
	"QQ|100000-100000000000":1,
	"email":"@email"
});


//辅导员————事务详情
Mock.mock("http://localhost:8080/graduation/affairView", {
	"title":"@ctitle(6,10)",
	"text_kind|1":["事假","病假","其他"],
	"text":"@cparagraph(3,6)",
	"fileName":"@cword(6,10)",
	"teaAnswer":"@cparagraph(3,4)",
	"status":2
});

//学生————事务详情
Mock.mock("http://localhost:8080/graduation/getTeaOneAffair", {
	"title":"@ctitle(6,10)",
	"text_kind|1":["事假","病假","其他"],
	"text":"@cparagraph(3,6)",
	"fileName":"@cword(6,10)",
	"teaAnswer":"@cparagraph(6,8)",
	"status":1
});

Mock.mock("http://localhost:8080/graduation/getTeaOneNews",{
	"title":"@ctitle(6,10)",
	"text":"@cparagraph(36)"
})

var aCount=Mock.mock({
	"name|4":"ab"
})
var _aCount=Mock.mock({
	"name|2-8":"ab"
})

console.log(_aCount);

