// 資料存放至 data
let data;
// 刷新的資料 以利用於比對
let dataNew;
// 設定幾秒往下移動一次
let lapse = 5000;
// 資料存在的開關
let dataExist;

// //手機效果不輪播 可開關
// if (window.innerWidth <= 767){
//     lapse = 864000000
// }

// 獲取資料 本地端 JSON檔案
function getData() {
    // 讀取本地之JSON檔
    fetch("./SimisOnProgress.json")
    .then(response => {
        if (response.ok) {
            // 資料存在就為 1
            dataExist = 1
            return response.json();
        } else {
            // 資料不存在為 0
            dataExist = 0
        }
    })
    .then(function (jsondata) {
        if (dataExist) {
            data = jsondata

            // 渲染資料
            renderData()

            // 定義 fullpage 實體
            play()
        }else{
            console.log('沒有資料，這邊要執行沒有資料的操作');
        }
    })
}

// --------------------(渲染)--------------------
// 渲染資料用
function renderData() {
    // num累加用
    let num = 0;
    // 設定雙色分離的號碼
    let noNum = 0;
    // 空字串放置累加資料 累加 section 但是 /div 需要再增加回來
    let str = '';
    // 從全部資料 累加渲染資料到str
    for (let i = 0; i < data.length; i++) {
        

        // 防XXS的 用於特殊符號 以防 < > 都失效
        let templateData = data[i].作業說明;
        let XXS='';
        for(let Xi = 0; Xi < templateData.length; Xi++) {
            if (templateData[Xi] == '<'){
                XXS += '&lt';
            }else if (templateData[Xi] == '>'){
                XXS += '&lt';
            }else{
                XXS += templateData[Xi]
            }
        }


        // 判斷是否為雙數
        if (String((i+1)/2).indexOf('.') + 1 > 0 ) {
            // 不是雙數
            noNum = 1
            str += `
            <div class="section">
                <div class="card">
                    <div class="card-top">
                        <div class="name ${noNum == 2 ? 'no2' : ''}">
                            <p>${data[i].人員名稱}</p>
                        </div>
                        <div class="condition ${data[i].狀態 == '生產' ? 'ing' : ''} ${noNum == 2 ? 'no2' : ''}">
                            <p class="${data[i].狀態 == '生產' ? 'ing' : 'stop'}">${data[i].狀態}</p>
                        </div>
                        <div class="start-time ${noNum == 2 ? 'no2' : ''}">
                            <span>${data[i].開始時間}</span>
                        </div>
                    </div>
                    <div class="card-mid">
                        <div class="info ${noNum == 2 ? 'no2' : ''}">
                            <p>${XXS}</p>
                        </div>
                    </div>
                    <div class="card-down">
                        <div class="end-time ${noNum == 2 ? 'no2' : ''}">
                            <p>${data[i].預估結束時間}</p>
                        </div>
                        <div class="expected ${noNum == 2 ? 'no2' : ''}">
                            <p>${data[i].預計產量+' '+data[i].單位}</p>
                        </div>
                    </div>
    
                </div>
            `
        }else{
            // 是雙數
            noNum = 2
            str += `
                <div class="card">
                    <div class="card-top">
                        <div class="name ${noNum == 2 ? 'no2' : ''}">
                            <p>${data[i].人員名稱}</p>
                        </div>
                        <div class="condition ${data[i].狀態 == '生產' ? 'ing' : ''} ${noNum == 2 ? 'no2' : ''}">
                            <p class="${data[i].狀態 == '生產' ? 'ing' : 'stop'}">${data[i].狀態}</p>
                        </div>
                        <div class="start-time ${noNum == 2 ? 'no2' : ''}">
                            <span>${data[i].開始時間}</span>
                        </div>
                    </div>
                    <div class="card-mid">
                        <div class="info ${noNum == 2 ? 'no2' : ''}">
                            <p>${XXS}</p>
                        </div>
                    </div>
                    <div class="card-down">
                        <div class="end-time ${noNum == 2 ? 'no2' : ''}">
                            <p>${data[i].預估結束時間}</p>
                        </div>
                        <div class="expected ${noNum == 2 ? 'no2' : ''}">
                            <p>${data[i].預計產量+' '+data[i].單位}</p>
                        </div>
                    </div>
    
                </div>
            </div>
            `
        }
        // num 累加 暫時無用
        num++
    }
    // 貼上到DOM元素
    document.querySelector('#fullpage').innerHTML = str;
}



// --------------------(fullpage 定義實體)--------------------
// 命名為 myFullpage
let myFullpage
function play() {
    // 完整複雜版 參數設定
    myFullpage = new fullpage('#fullpage', {
        //導航
        menu: '#menu',
        lockAnchors: false,
        anchors:[],// 預設是'firstPage', 'secondPage' 依此類推到底幾個 無設定的話就要注意 錨點的使用
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //滾動
        css3: true,
        scrollingSpeed: 500,//滾動速度(毫秒)
        autoScrolling: true,//補全滾動切換
        fitToSection: true,//以滿版頁面補滿螢幕
        fitToSectionDelay: 500,//以滿版頁面補滿螢幕的延遲(毫秒)
        scrollBar: false,//顯示滾動條 原本有開 但要兼容 continuousVertical 要關閉
        easing: 'easeInOutCubic',//easing插件 我這邊沒有額外使用
        easingcss3: 'ease',//easing插件 我這邊沒有額外使用
        loopBottom: false,//向下滾動 原本有開 但要兼容 continuousVertical 要關閉
        loopTop: false,//向上滾動 原本有開 但要兼容 continuousVertical 要關閉
        loopHorizontal: true,//水平滾動
        continuousVertical: true,//頭尾頁相接 不支援 loopTop、loopBottom、scrollBar：true 或 autoScrolling：false 為了輪播 必須要開啟否則會抽搐
        continuousHorizontal: false,//同上
        scrollHorizontally: false,//水平滾輪使用 我這邊沒有使用
        interlockedSlides: false,//水平滾輪 強制同方向向上 我這邊沒有使用
        dragAndMove: false,//觸控滑塊
        offsetSections: false,//基於%數，非全版顯示的方式 我這邊沒有使用
        resetSliders: false,//滑開後重製滑塊
        fadingEffect: false,//淡出淡入
        normalScrollElements: '#element1, .element2',//指定不會移動的滑塊選擇器
        scrollOverflow: false,//需要 scrollOverflow插件 讓多餘內容也能被滑塊包裹
        scrollOverflowReset: false,//同上的附屬參數
        scrollOverflowOptions: null,//同上的附屬參數
        touchSensitivity: 15,//滑動的靈敏度 預設5
        bigSectionsDestination: null,//上下觸發矯正的位置 預設null

        //可訪問
        keyboardScrolling: true,//可用鍵盤進行滑動
        animateAnchor: true,//用animate動畫的方式滾動
        recordHistory: false,//將每個滑塊都建立到一個瀏覽紀錄當中

        //自定義選擇器
        sectionSelector: '.section',
        slideSelector: '.slide',

        lazyLoading: true,

        //事件
        onLeave: function(origin, destination, direction){
            //清除 否則會抖動 並且 可讓用戶自行移動時不會進入倒數導致重複移動
            clearInterval(g_interval);
        },
        afterLoad: function(origin, destination, direction){
            //自動往下一張撥放 
            g_interval = setInterval(function () {
            fullpage_api.moveSectionDown();
            }, lapse);

        },
        afterRender: function(){},
        afterResize: function(width, height){},
        afterReBuild: function(){},
        afterResponsive: function(isResponsive){},
        afterSlideLoad: function(section, origin, destination, direction){},
        onSlideLeave: function(section, origin, destination, direction){}
    });
}

// --------------------(自動化刷新)--------------------
// 每10s 重新 updata
setInterval("updata()","10000");
// 10秒更新資料的手法
function updata() {
    let upSwitch = 0
    if (dataExist) {
        // 讀取本地之JSON檔
        fetch("./SimisOnProgress.json")
        .then(response => {
        return response.json();
        })
        .then(jsondata => dataNew = jsondata)
        .then( function () {
            if (JSON.stringify(data) !== JSON.stringify(dataNew)) {

                console.log('資料發生異動');
                // 深層複製 新資料到舊資料當中
                data = JSON.parse(JSON.stringify(dataNew))

                // 觸發 更新開關 因為無法再用資料變動去判斷
                upSwitch = 1
            }
        })
        // 清除 fullpage 綁定
        .then( function () {
            if (upSwitch === 1) {
                // console.log('清除 fullpage 綁定');
                fullpage_api.destroy('all');
            }
        })
        // 異動後的渲染
        .then( function () {
            if (upSwitch === 1) {
                // console.log('異動後的渲染');
                // 調用渲染
                renderData();
            }
        })
        // 異動後的定義實體
        .then( function () {
            if (upSwitch === 1) {
                // console.log('異動後的定義實體');
                // 清除定時滾動綁定
                clearInterval(g_interval);
                // 調用綁定 fullpage 實體
                play();
            }
        })
        // 將更新開關 關閉
        .then(upSwitch = 0)

    }else{
        
        // 讀取本地之JSON檔
        fetch("./SimisOnProgress.json")
        .then(response => {
            if (response.ok) {
                // 資料存在就為 1
                dataExist = 1
                
                return response.json();
            } else {
                // 資料不存在為 0
                dataExist = 0
                console.log('資料不存在');
            }
        })
        .then(function (jsondata) {
            if (dataExist) {
                dataNew = jsondata

                if (JSON.stringify(data) !== JSON.stringify(dataNew)) {

                    console.log('資料發生異動');
                    // 深層複製 新資料到舊資料當中
                    data = JSON.parse(JSON.stringify(dataNew))
    
                    // 觸發 更新開關 因為無法再用資料變動去判斷
                    upSwitch = 1
                }

                // 渲染資料
                if (upSwitch === 1) {
                    // console.log('異動後的渲染');
                    // 調用渲染
                    renderData();
                }
    
                // 定義 fullpage 實體
                if (upSwitch === 1) {
                    // console.log('異動後的定義實體');
                    // 調用綁定 fullpage 實體
                    play();
                }

                upSwitch = 0
            }else{

                console.log('沒有資料，這邊要執行沒有資料的操作');
            }
        })

    }

}


// --------------------(速率調整)--------------------

function goRocket(e) {
    switch (e.keyCode) {
    case 49:
        lapse = 2500
        console.log('目前速度: ',lapse/1000,'秒');
        break;
    case 50:
        lapse += 2500
        console.log('目前速度: ',lapse/1000,'秒');
        break;
    case 51:
        lapse -= 2500
        console.log('目前速度: ',lapse/1000,'秒');
        break;
    }
}
// 監聽 是否按下按鈕
document.body.addEventListener('keydown',goRocket,false)

// --------------------(初始化)--------------------
// 初始化
function init() {
    //獲取資料
    getData();
}

init();









































