window.onload = function() {
  if (typeof FileReader === 'undefined') {
    alert('你的浏览器版本过低，请先升级版本')
  }
}
const assessToken =
  '24.510624cf02f6b7466b7d40775c7757e1.2592000.1580097278.282335-18091036'
// 图片内容
var imageDate = []
// 读取图片
$('#fileImage').on('change', function() {
  var len = this.files.length
  for (var i = 0; i < len; i++) {
    var str = ''
    var reader = new FileReader()
    reader.readAsDataURL(this.files[i])
    reader.fileName = this.files[i].name
    reader.onload = function() {
      var imgMsg = {
        name: this.fileName,
        base64: encodeURI(removeBS64Header(this.result))
      }
      imageDate.push(imgMsg)
      str = `<li>
        <img src="${this.result}" title="${this.fileName}" />
      </li>`
      $('#images ul').append(str)
      console.log(imageDate)
    }
  }
  $('#fileText').val(`选则了${len}张图片`)
})

// 识别文字
$('#discern-btn').on('click', function() {
  $.ajax({
    url: `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=${assessToken}`,
    type: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      image: imageDate[0].base64
    },
    success: function(e) {
      console.log(e)
    }
  })
})

// 去除base64打头部分
function removeBS64Header(str) {
  var header = 'data:image/png;base64,'
  str = str.replace(new RegExp(header, 'g'), '')
  return str
}
