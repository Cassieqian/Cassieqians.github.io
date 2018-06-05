/**
 * Created by win7 on 2017/2/11.
 */
function lunbo(elementid){
    function my$(id) {
        return document.getElementById(id);
    }
    function animate(element,target){
        clearInterval(element.timeId);
        var current=element.offsetLeft;
        var step=9;
        step=target>current?step:-step;
        element.timeId=setInterval(function(){
            current+=step;
            if(Math.abs(target-current)<Math.abs(step)){
                clearInterval(element.timeId);
                current=target;
            }
            element.style.left=current+"px";
        },5);
    }
   var box= my$(elementid);
    //��ȡscreen��---���ǽ�����ʾ��ӦͼƬ�Ŀ��ȵĲ�
    var screen=box.children[0];//a
    //��ȡul
    var ul=screen.children[0];//ul
    var lis=ul.children;//img-li
    var ol=box.children[1];//ԭ��ul
    var lis2=ol.children;//ԭ��li
    //��ȡ������---����Ӧ�����Ұ�ť
    var arr=box.children[2];//��ͷul
    var left=arr.children[0];//����ͷ
    var right=arr.children[1];//�Ҽ�ͷ
    //��ȡ��ʾͼƬ�Ŀ���---����box���Ŀ���
    var imgWidth=box.offsetWidth;
    //�ñ����������Ǳ�����Ӧli�е�����,Ŀ�ģ������������Ұ�ť��ʱ��,�ƶ���ͼƬ��������li����������һ��
    var pic=0;
    //1.����ul��li�ĸ���,��̬�Ĵ���li�����뵽ol��
    for(var i=0;i<lis2.length;i++){
        //Ϊÿһ��liע�������������¼�,����---����
        lis2.onmouseover=function () {
            //����ol�����е�li,�ɵ����е���ʽ,ֻ�е�ǰ��li����ʽ
            for(var j=0;j<lis2.length;j++){
                lis2[j].className="";
            }
            this.className="current";
            //���ö����ĺ���
            var target=-this.index*imgWidth;
            animate(ul,target);
            pic=this.index;//������Ҫ
        };
    }
    ol.children[0].className="current";
    //�������뵽box������֮ǰ�Ӽ�ʱ��
    var timeId=null;
    timeId=setInterval(rightHandle,1000);
    //�������뵽box����ʾ������,�뿪���� ��
    box.onmouseover=function () {
        arr.style.display="block";
        clearInterval(timeId);//��
    };
    box.onmouseout=function () {
        arr.style.display="none";
        //======��====
        timeId=setInterval(rightHandle,1000);
    };
    //�����ұߵİ�ť,ͼƬ��ʼ�ƶ�
    right.onclick=rightHandle;
    function rightHandle() {
        if(pic==lis.length-1){//pic=5 lis.length-1===5
            pic=0;//����Ϊ0��ʱ��
            ul.style.left=0+"px";
        }
        pic++;
        var target=-pic*imgWidth;
        animate(ul,target);
        //�ж�
        if(pic==lis.length-1){//pic===5  lis.length-1=====5,������--��һ��
            ol.children[0].className="current";
            ol.children[lis2.length-1].className="";
        }else{
            //����
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className="";
            }
            ol.children[pic].className="current";
        }
    };
    //�������߰�ť,ͼƬ��ʼ�ƶ�
    left.onclick=function () {
        if(pic==0){
            pic=lis.length-1;
            ul.style.left=-(lis.length-1)*imgWidth+"px";
        }
        pic--;
        var target=-pic*imgWidth;
        animate(ul,target);
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className="";
        }
        ol.children[pic].className="current";
    };
}