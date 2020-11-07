/* 后补1：类 如果要 使用 别的 类中 的方法，数据，等等。
如果关联性不大，可以不用 继承，直接在 constructor里，初始化其他类的实例*/
// 后补2：数据的流转：流入 与 流出
// 后补2：应当对 数据 在 函数，类，类的属性，类的方法 之间的流转，做到了然于心。
//页面开始初始化
class Mapper extends MusicHtml {
    constructor(id) {
        super()
        // 实例化，获取 音乐数据，此处为 音乐数据0
        this.items = new MusicData().items

        // 存储区

        //只保留音乐名字 与 歌手 的字符串
        // 名字-歌手
        this.songers = []

    }

    //初始化页面显示
    // 传入 初始音乐 在数组中的下标
    inthtm(index) {
        // 获取 存储的 音乐信息，也就是 src 是字符串类型
        let src = 'song/' + this.items[index]
        // 设置 audio 标签的 src
        this.audio.src = src
        // 在自定义属性中存储 音乐 的下标 信息
        this.audio.dataset.active = `${index}`

        // 初始化 audio 音量
        this.audio.volume = 0.5

        this.muscitime.innerHTML = '00:00'
    }

    //处理音乐名字函数
    // 此处获取的为 音乐数据0
    // 处理之后是 音乐数据1
    // 后补1：貌似只能在 canplay 事件中使用。假如先调用，在canplay回调中this.songers是空数组
    // 后补1：推测是本地加载比JS执行快，但是木有深究原因。
    // 后补1：也可以把这个，放存储音乐列表的 类中 初始化。
    // 后补1：也可以放在后端 进行处理，暂时懒得调整
    intmusic() {
        let music = this.items
        let r = []
        for (let i = 0; i < music.length; i++) {
            let m = music[i]
            let n = m.split('.')[0]
            r.push(n)
        }
        this.songers = r
    }

    //初始化集合函数
    int(index) {
        this.inthtm(index)
    }

}

//音乐 时间进度条 显示 控制
// 后补1；mousemove 事件，小圆点以及进度条的移动，可以使用 input的range 加CSS
class MusicPro extends Mapper{
    constructor() {
        super('MusicPro')
        //传入event参数，用于获取事件发生时，鼠标的位置
        this.event = {}

        // 存储区
        this.length = 0

        //通过 ide 的值 来确定 是否执行 mousemove 回调函数里的 方法
        //判断是否在 拖拽小圆点
        this.ide = ''
    }

    //计算事件发生时，鼠标相对于进度条父元素左侧边界的 位置
    dragLength() {
        let length = this.event.pageX - this.playdrag
        this.length = length
    }

    //控制小圆点，音乐进度条 的位置
    dragSliPro(length) {
        let len = length
        // 小圆点距离 父元素边界的 距离
        this.sli.style.left = `${len - 5.5}px`
        // 进度条距离 父元素边界的 距离
        this.pro.style.width = `${len + 2}px`

    }

    //根据事件发生时的位置，重新显示小圆点，进度条的前进与后退
    songTime() {
        // 获得 事件发生时，需要移动的距离
        let len = this.length

        // 计算音乐 时间 的比例
        let n = len / 585
        let time = this.audio.duration

        // this.audio.currentTime = Math.floor(time * n)
        // 音乐时间 跳跃
        this.audio.currentTime = time * n

        //可以在 'timeupdate' 事件中，监听，音乐时间发生变化，进度条发生变化
        //此处弃置 不用
        // 小圆点 进度条 前进或者后退
        // this.dragSliPro(len)

    }

    //根据音乐的播放时间，显示小圆点，进度条的前进与后退
    songPlay(name) {
        let a = this.audio.currentTime
        let time = this.audio.duration

        // 根据 音乐时间 的比例，计算 小圆点进度条，变化的长度
        let len = (a / time) * 585

        // 小圆点 进度条 前进或者后退
        this.dragSliPro(len)
        // log(name || '')
    }

    //判断，当鼠标摁下时，元素 是不是小圆点
    holdSlide() {
        let self = this.event.target
        if (self.classList.contains('player-slider')) {
            // 阻止默认事件，拖动显示
            this.event.preventDefault()
            //将ide 设置为 true，意思是此时鼠标移动，可以执行函数
            this.ide = true
        }
    }

    //进度条 鼠标松开 入口
    intUp(event) {
        //存储 event 对象
        this.event = event || {}
        //将ide 设置为 false，阻止处理 鼠标移动
        this.ide = false
        //确定 距离，移动音乐时间
        this.dragLength()
        this.songTime()
    }

    //进度条 鼠标摁下 入口
    intDown(event) {
        //存储 event 对象
        this.event = event || {}
        //判断是否在，小圆点上 发生了事件
        this.holdSlide()
    }

    //进度条 鼠标移动事件 入口
    intMove(event) {
        //存储 event 对象
        this.event = event || {}

        //确定 距离，移动音乐时间
        this.dragLength()
        this.songTime()
    }
}

//音乐 音量进度条 控制
// 后补1；mousemove 事件，小圆点以及进度条的移动，可以使用 input的range 加CSS
class MusicVol extends Mapper {
    constructor() {
        //往父元素传参，用来看调用者是谁
        super('MusicVol')

        //存储区
        this.event = {}
        this.volen = 0

        //根据 ide 的值，进行鼠标移动事件 处理
        this.ide = ''
    }

    //计算事件发生时，鼠标相对于进度条父元素左侧边界的 位置
    voldrag() {
        log('aaaa', this.vollength)
        let len = this.event.pageX - this.vollength
        this.volen =  len
    }

    //控制小圆点，音乐进度条 的位置
    volSliPro(length) {
        let len = length
        this.volsli.style.left = `${len - 5.5}px`
        this.volpro.style.width = `${len + 2}px`
    }

    //根据事件发生时的位置，重新显示小圆点，进度条的前进与后退
    volTime() {
        //取出 移动的距离
        let len = this.volen

        // 根据移动距离，计算音量比例
        let n = len / 125
        this.audio.volume = n

        // 根据移动距离 移动小圆点与音量条
        this.volSliPro(len)

        log('音量是', this.audio.volume)
    }

    //音量，鼠标松开，入口
    intVolUp(event) {
        // 存储，发生事件的，对象
        this.event = event || {}
        // 设置ide 鼠标移动 可触发处理函数
        this.ide = false
        // 计算 触发事件，鼠标的位置
        this.voldrag()
        // 根据计算的位置，音量进度条 进行移动
        this.volTime()
    }
}

//音乐 时长，现在时间
class MusicTime extends MusicPro {
    constructor(id) {
        //往父元素传参
        super(id)
        // 后补1：可以将时间，存储到这里。这样不需要传参数
    }

    //传入秒数，返回格式化好的 显示为 {分；秒} 的字符串
    songli(length) {
        // 因为 length 是以 秒 为单位的 浮点数
        let minute = Math.floor(length / 60)
        let second = Math.floor(length % 60)
        let t = ``
        // 此处进行，分 与 秒 的处理。
        if (second > 9) {
            t = `0${minute}:${second}`
            // log('长度显示为', t, '秒数大于9')
        } else {
            t = `0${minute}:0${second}`
            // log('长度显示为', t, '秒数小于10')
        }
        return t
    }

    //返回处理好的，音乐总长度
    songlength() {
        //获取 音乐 的总时长
        let length = this.audio.duration
        //返回处理 好的数据。格式是 '04:40'
        return this.songli(length)
    }

    //返回处理好的，音乐现在的时间
    songtime() {
        //获取 音乐 现在的时间
        let time = this.audio.currentTime
        //返回处理 好的数据 格式是 '01:40'
        return  this.songli(time)
    }

    // 得到音乐 总时长的，方法入口
    intSongLen() {
        let length = this.songlength()
        return length
    }

    // 得到音乐 现在时间的，方法入口
    intSongTime() {
        let time = this.songtime()
        return time
    }
}

var inde = 'inde'
//播放，暂停，切换音乐 按钮
class MusicButton extends MusicPro {
    constructor() {
        super()
        // 播放器控制播放按钮参数 表驱动法
        this.buttons = {
            'music_play': {
                func: this.activePlay.bind(this),
                id: undefined,
                ind: 'play',
            },
            'music_pause': {
                func: this.activePause.bind(this),
                id: undefined,
            },
            'music_last': {
                func: this.musicSwitch.bind(this),
                id: -1,
            },
            'music_next': {
                func: this.musicSwitch.bind(this),
                id: 1,
            },
        }

        //存储区，也可以不写；但是写了，对数据通信 容易理解
        //以下是按照函数执行先后 排列
        //（尽量写为数据原本的格式，目前只不过没有数据 所以随便写，或者执行了不发生变化的数据）
        this.event = {}

        this.action = ''
        this.buttonId = ''
        //只有在 切换音乐时，才存储
        this.indexNext = ''

        //取出存在 audio标签，自定义属性中的 歌曲下标
        // this.dataIndex = parseInt(this.audio.dataset.active, 10)
        this.dataIndex = 0

    }

    //计算音乐切换后，在音乐数组中的下标
    nextIndex() {
        // log('值得注意的是, 需要思考 类 与类实例的关系 1', new MusicHtml().dataIndex)

        //数组的长度
        let len = this.items.length
        // 上一首 和 下一首 的id，不同，分别是 1 与 -1
        let offset = this.buttonId || 0
        // 此时 音乐 的下标
        let index = this.dataIndex
        //通过取余数，计算切换之后的，音乐 在数组中的下标
        let indexNext = (index + offset + len) % len
        //存储下标

        this.indexNext = indexNext
        //替换父类中 this.dataIndex 的值；也可以在 super 里传参 来 替换
        // 后补1. 实例中的数据，都是模块化好，比如在类中 储存的this.id = 1；那么
        // 所以实例的this.id 都等于1，包括 继承 自父类，父类的值 始终是默认的
        // 所以要动态 储存 一个值，让同一个类中的 函数，都能用到，
        // 最好，是初始化 其他类的 实例，来做事情
        this.dataIndex = indexNext

        log('this.textId button', this.textId)
        // log('值得注意的是, 需要思考 类 与类实例的关系 2', new MusicHtml().dataIndex)
        // 值得注意的是, 需要思考 类 与类实例的关系
        // 后补1

        // 假如中途切换音乐，需要保证，进度条归零
        this.dragSliPro(-2)

    }

    //切换音乐
    cut() {
        //将存储的数据，赋值给 index
        let index = this.indexNext
        //根据下标，找到储存在数组中的 音乐的src
        let song = 'song/' + this.items[index]
        log('音乐切换后是', song)

        //更改页面中，audio 标签的 src 属性，以及自定义的 data-active 属性
        this.audio.src = song
        this.audio.dataset.active = `${index}`

    }

    active() {
        for (let i = 0; i < this.eles.length; i++) {
            let e = this.eles[i]
            e.classList.toggle('active')
        }
    }

    // 播放键
    activePlay() {
        //音乐 播放
        // log('isisisis-///*', inde)
        // log('*************', this)
        // log(arguments)
        // log('this is ', this, '/*/**', this.ind)
        this.audio.play()
        //播放键隐藏 暂停键显示
        this.active()
        // this.playButton.classList.add('active')
    }

    // 暂停键
    activePause() {
        //音乐 暂停
        this.audio.pause()
        //暂停键隐藏 播放键显示
        this.active()
        // this.pauseButton.classList.add('active')
    }

    // 切换键
    musicSwitch() {
        log('next or last')
        //计算切换 之后的下标，并存储
        this.nextIndex()
        //音乐切换
        this.cut()
    }

    //控制台按钮处理
    musicShow1() {
        //存储的，表驱动法
        let m = this.buttons
        //取出，存储的 data-action
        let action = this.action

        // 这行 放在外面，如果点击的是 按钮的父元素 区域，会报错，而且操作数多
        // this.buttonId = m[action].id || 0
        // let ind = '02646'

        if (Object.keys(m).includes(action)) {
            //存储 buttonId，以便判断 是 切换 到上一首 还是 下一首
            this.buttonId = m[action].id

            // f 这个时候是一个函数
            // let f = m[action].func

            // 正确的写法二
            // let f = m[action].func.bind(this)

            // let f = {foo: m[action].func, ind: '021345'}
            m[action].func()

            // log(f, typeof f, '****', f.length, '//////////', this)
            // log(arguments)
            // m[action].func()
            // f(this)
            // f.foo()


            //正确的写法三
            // f.call(this)
            // f.apply(this)

            // 可以运行的写法 一
            // 用类的实例 扩充作用域, 将 f 所指向的函数，放置在 新环境中 并执行
            // f.call(new MusicButton())
            // f.apply(new MusicButton())

            // let ytf = new MusicButton()
            // f.call(ytf)
        }
    }

    funcOn() {
        //获取 发生事件的 元素
        let self = this.event.target
        //存储，元素的 data-action 数据
        this.action = self.dataset.action || ''
        //进入 判断 执行函数
        this.musicShow1()
    }


    intButton(event) {
        //存储 event 对象
        this.event = event || {}
        this.funcOn()
    }
}

//音乐数据在页面中的显示
//显示音乐时长、名字、歌手，音量与音量进度条
//缓冲条的显示，进度条的重置
class MusicShow extends MusicTime {
    constructor() {
        //给父元素传参
        super('MusicCanPlay')
        //音乐缓冲完成后，需要初始化音量显示
        this.canvol = new MusicVol()
        // this.index = parseInt(this.audio.dataset.active, 10)

        // 处理 歌词数据的 类
        this.dataLrc = new LrcTime()

        // 读取并加工歌词数据，为html，让歌词在页面中显示 的类
        this.showLrc = new LrcShow()

        // 控制歌词滚动 的类
        this.showLrcRoll = new LrcPon()


        // 存储区
        this.song = []

        // 音乐的下标
        this.index = 0

        // 存储处理好的歌词数据
        // 后补1：可以把 将歌词加工html 的函数，与插入页面 的函数，分开
        this.data = []
    }

    //在页面中显示，音乐的总时长
    showlength() {
        // 需要显示 音乐时长 的页面元素，的集合 长度
        // 因为元素是提前，在父类 处理 进行获取的，所以直接用
        // 用人话说，显示 音乐时长 的span（div） 个数
        let len = this.musiclength
        // 获取处理后的  音乐时长
        let songlen = this.intSongLen()
        log('歌曲长度是', songlen)
        // 循环处理，提前绑定好了，class
        for (let i = 0; i < len.length; i++) {
            let l = len[i]
            // 将值修改为
            l.innerHTML = songlen
        }
    }

    //在页面中显示，音乐现在的时间
    showNowtime(name) {
        // 获取 处理后的 时间
        let time = this.intSongTime()
        // 将值修改为。
        // 因为元素是提前，在父类 处理 进行获取的，所以直接用
        this.muscitime.innerHTML = time
        // log(name || '')
    }

    // 处理音乐的各类信息
    // 此处的获取的是音乐数据 1
    // 处理之后是音乐数据 2
    songData() {
        //获得当前加载完成 音乐，在数组中的下标
        let index = parseInt(this.audio.dataset.active, 10)
        //获得 处理完成的 ['音乐-歌手'] 格式的数组
        let songers = this.songers || []

        //数组中的元素是 '音乐-歌手' 这样的字符串，进行 '-' 切片处理
        //处理好的数组中有两个元素 ['音乐', '歌手']
        let song  = songers[index].split('-')

        //存储数据
        // 如果 song 是假值，将 [] 赋值给 this.song
        // 存储分割完成，的 音乐 数据 ['音乐', '歌手']
        this.song = song || []
        // 存储 音乐，在 音乐数组 中的下标。
        //（同时也是，歌词数据0，音乐数据1，的共同定位，下标）
        // 音乐数组，就是存放所有音乐信息的数组。信息以以字符串存储
        // 元素是 字符串 类型，格式为 '名字' + '文件扩展名'
        this.index = index || 0
    }

    //在页面中显示，音乐的名字
    showname() {
        //获取下标，以及存储 音乐 的数组
        //因为页面中，有两处需要显示 音乐 的地方，所有用 class 提起绑定
        for (let i = 0; i < this.names.length; i++) {
            let name = this.names[i]
            //用split 切割的时候，songname 是数组的第1个元素
            name.innerHTML = this.song[0]
        }
    }

    //在页面中显示，音乐的歌手
    showsonger() {
        //用split 切割的时候，songer 是数组的第2个元素
        let songer = this.song[1]
        this.songer.innerHTML = songer

        log('歌手是', songer)
    }

    //通过音乐，下标，找到对应的歌词，处理并返回数据
    // 因为，歌词 在数组的下标，与 音乐 在数组的下标一样
    // 根据存储 数据，形式的变化，在读取数据时，需要做改动
    dataSongLrc() {
        // 获取，保存的下标
        let index = this.index
        // 获取歌词原始数据 并处理完成，此处的返回值是 歌词数据1
        // 原始歌词数据，应该为 歌词数据0
        // 后补1：此处又后端完成
        let data = this.dataLrc.intlrc(index)
        //存储数据
        this.data = data || []
    }

    datalrcHtml() {
        // 获取 存储的 歌词数据。此处的获取的是 歌词数据1
        let data = this.data
        //传入数据，对页面 进行操作
        // 后补1：应当分离此步骤，将html格式后的数据，返回为 歌词数据2
        this.showLrc.intLrcHtml(data)
    }

    //显示歌词
    showhtml() {
        //找到歌词数据0，处理为歌词数据1
        this.dataSongLrc()
        // 获取歌词数据1，处理，并在页面显示
        this.datalrcHtml()
    }

    // 找到与 当前音乐时间，相匹配的歌词。滚动 并高亮
    datalrcRollHtml() {
        // 获取 存储的数据，此处的获取的是 歌词数据1
        /* 歌词数据1 的 数据格式为[{
            时间：时间
            歌词：歌词
           }，....]
        */
        let data = this.data
        //传入数据，找到匹配时间的歌词，进行滚动，并高亮处理
        this.showLrcRoll.lrcRoll(data)
    }

    // 滚动 并高亮 歌词，方法入口
    showRoll() {
        this.datalrcRollHtml()
    }

    // 进度条随时间变化，音乐时间 实时显示；方法入口
    intUpdate() {
        // 进度条·
        this.songPlay()
        // 音乐时间·
        this.showNowtime()
    }

    bindTime() {
        // audio 元素，提前 在 父类，绑定好
        // 后补1：可以使用继承 父类，也可以，初始化为 一个实例
        let a = this.audio
        // 监听 timeupdate 事件，随音乐时间，需要动态变化的 处理 都在此处
        a.addEventListener('timeupdate', (event) => {
            log('timeupdate')
            // 进度条 & 时间显示
            this.intUpdate()
            // 歌词滚动 & 高亮
            this.showRoll()
        })
    }

    //音乐缓冲完成，初始化函数集合
    showSong() {
        //在缓冲完之后，初始化音乐列表，因为本地缓冲时间较快。
        // 音乐列表 为音乐数据 1。初始化，是对 音乐数据0 进行处理，元素包含扩展名
        // 音乐数据 1 是去掉文件扩展名，的字符串，集合数组。

        // 此处的获取的是音乐数据 0
        // 处理之后为音乐数据 1
        this.intmusic()

        //初始化页面显示函数

        //显示音乐 时长
        this.showlength()


        //根据下标处理数据
        // 获取音乐，在数组的下标，
        // 获取并处理音乐信息，方便读取，名字 与 歌手.
        // 此处的获取的是音乐数据 1
        // 处理之后为音乐数据 2

        // 存储下标，方便寻找 歌词
        this.songData()
        //显示音乐，歌手
        this.showname()
        this.showsonger()
        // 显示歌词
        this.showhtml()
    }

    //音乐加载完成，初始化音量，音量进度条显示。
    //音乐加载完成，缓冲条的显示
    showvol() {
        //获得 audio 标签的音量
        let n = this.audio.volume

        //通过 音量，计算音量条 显示的长度
        let len = n * 150

        //音量条 移动
        this.canvol.volSliPro(len)

        //缓冲条，长度变化
        this.buffer.style.width = '100%'
    }


    //音乐展示 函数入口
    intShow() {
        // 音乐各类 信息的展示
        this.showSong()
        // 音量的显示
        this.showvol()

        //timeUpdate 事件
        this.bindTime()
    }

}

//歌词处理 的类
class LrcTime {
    constructor() {
        this.func = {
            '0': this.mim,
            '1': this.sec,
            '2': this.tic,
        }
        this.lrcText = new LrcData()

        //储存器
        //音乐歌词第一步处理，存储；每个元素是 一句歌词，包含歌词时间
        this.musicLrcList = []
        //音乐歌词第三步处理，存储；每个元素是字典，里面有歌词句子，歌词时间
        this.musicLrcHtml = []

        //歌词 在歌词数组的下标
        this.index = 0
    }

    // 将 几分钟，转化为 多少秒。字符串转数字
    mim(a) {
        return Number(a) * 60
    }

    // 将 多少秒，转化为 多少秒。字符串转数字
    sec(a) {
        return Number(a)
    }

    // 将 多少毫秒，转化为 多少秒。字符串转 浮点数
    tic(a) {
        return Number(a) / 100
    }

    // 歌词 处理步骤1：根据每句 歌词 之间的字符，来split
    //获取到一个，包含所有歌词的数组，每个元素都是一句包含 开始时间歌词
    //重点：可以 初始化时候调用。使用 this. 将数组 保存在 constructor中。
    lrcarray() {
        let index = this.index
        let text = this.lrcText.txt[index]
        let r = text[0].split('\n')
        this.musicLrcList =  r
    }

    //歌词 处理步骤3 ：对每句歌词的时间，转化为 秒。方便比较
    //因为 audio.currentTime 是以 s 为单位
    lrctime(string){
        // 参数 是一个包含时间的字符串，其中有无关字符
        let s = string
        // 表驱动法，不进行 if else 判断
        let r = this.func
        //声明 初始化时间，保存处理好的数据，以秒为单位
        let time = 0
        /* 循环，因为 string 是 '04:45:10' 这样的字符串
           所以循环三次，依据规律 进行切片
           开始位置是 i * 3；结束位置是 i * 3 + 2
        */
        for (let i = 0; i < 3; i++) {
            let len = i * 3
            let t = s.slice(len, len + 2)

            // 根据 i 字符串转化 之后的值，作为Key。（此处可改进）
            let key = String(i)
            // r 是一个字典，key 是字符串，value 是一个函数（r[key]）
            // r[key]，是一个函数，(t)是传入参数，并调用
            let n = r[key](t)
            //得到的数据，以秒为单位
            time = time + n
        }
        return time
    }
    /* 歌词 处理步骤2：对步骤1中的 数组的每个元素，进行处理
       数组的每个元素，是包含 时间与歌词内容 的字符串；其中还有一些无关字符
       将每个元素，处理为，一个字典，里面有歌词开始时间，与歌词内容
       添加到新数组
    */
    // 可以使用 map 方法
    lrcarray1() {
        //获得步骤1 处理之后的数组
        let array = this.musicLrcList || []
        //初始化空数组，用来保存 数据
        let r = []
        //循环，对每个元素，进行处理：处理好的数据，存进一个字典。将字典放进数组
        for (let i = 0; i < array.length - 1; i++) {
            // 元素类似于这样 '[03:37.23]天地不灭  初心不改'
            let a = array[i]

            // 进行切片处理，获取歌词 时间
            let t = a.slice(1, 9)
            // 处理 歌词时间 字符串，获得以 秒 为单位的 数字类型
            let ti = this.lrctime(t)
            //整合为数组
            let o = {
                time: ti,
                lrctxt: a.slice(10),
            }
            r.push(o)
        }
        //存储
        this.musicLrcHtml = r
    }

    musicIntLrc() {
        this.lrcarray()
        this.lrcarray1()
    }
    //歌词处理，入口
    intlrc(index) {
        this.index = index || 0
        this.musicIntLrc()
        return this.musicLrcHtml
    }
}

//歌词滚动的类
//音乐下标会在，切换按钮，以及canplay 事件，中获取；
//可以在这两种类下，共用下标，处理数据
// 后补1；切换音乐，音乐时间发生跳跃时，歌词调整 较为僵硬
// 后补1：而 'timeupdate' 事件，每秒会触发4-8次
// 后补1；'timeupdate' 触发的次数足够多，说明是，歌词滚动的 判定条件 需要调整
class LrcPon extends MusicHtml {
    constructor() {
        super()
        // this.lrcInt = new LrcTime()

        //初始化保存，歌词 开始时间
        this.lrctimenow = 0
        //初始化保存，差值绝对值
        this.gaptime = 1

        // 歌词数组保存
        this.data = []

        // 歌词NodeList列表

    }

    //进行歌词的滚动，高亮显示
    lrcTrans(index) {
        //初始偏移值，保证歌词 在中间高亮
        let len = (index - 3) * 30
        //歌词 整体 div 沿着Y轴偏移
        this.lrcInner.style.transform = `translateY(-${len}px)`
        // 用下标找到，歌词 在 父元素 的位置
        this.lrcP = findAll(this.lrcInner, 'p')
        let lrc = this.lrcP[index]
        //歌词 高亮
        lrc.classList.add('on')
    }

    //计算 音乐当前时间，与数组中，歌词时间 的绝对值
    licNow () {
        // 现在音乐的时间，可以在 constructor 中 初始化
        this.songtimenow = this.audio.currentTime
        //现在音乐的时间 与 歌词开始时间 差值的绝对值
        this.gaptime = Math.abs(this.songtimenow - this.lrctimenow)
    }

    //找到时间 相匹配的歌词
    lrcJudge(index) {
        // 得到 一句歌词 的开始时间 与 播放时间 差值的绝对值
        this.licNow()
        // 判断歌词开始时间，与音乐播放时间的间隔，间隔小于数值则相符，进入滚动
        if (this.gaptime < 0.3) {
            // 删除所有高亮 class，之后再添加高亮效果
            removeClassAll('on')
            //找到与 播放时间 相同时间的歌词，下标；然后传入函数处理
            this.lrcTrans(index)
        }
    }

    //循环，获取音乐当前时间，找到匹配的歌词，进行滚动 以及 高亮显示
    lrcLoop() {
        //获得歌词处理后的数组
        let lrclist = this.data
        // 循环，找到与 音乐此刻 时间 相匹配的歌词
        for (let i = 0; i < lrclist.length; i++) {
            // 数组 每个元素 都是一个字典
            // 里面保存着，歌词开始时间，与歌词内容
            let lrc = lrclist[i]

            //更新 constructor 里的 值
            this.lrctimenow = lrc.time

            /* 因为歌词，与页面中 <p>歌词文本<p/> 这样的元素，个数相同
               而且在插入页面时候的，顺序也一样（具体看插入页面处理函数）
               所以，可以通过，获得数组 元素的下标，来调整htmL 中的
               歌词文本 元素。
               歌词文本元素，在父元素中的下标 与数组元素 下标相同
            */
            this.lrcJudge(i)
        }
    }

    // lrcData() {
    //     // 初始化 歌词 数据
    //     let id = this.textId
    //     log('this.textId roll is', this.textId)
    //     let data = this.lrcInt.intlrc(id)
    //     this.data = data
    // }

    // 歌词滚动 方法 入口
    lrcRoll(data) {
        // 歌词滚动
        this.data = data
        this.lrcLoop()
    }
}

//显示歌词的类
//音乐下标会在，切换按钮，以及canplay 事件，中获取；
//可以在这两种类下，共用下标，处理数据
class LrcShow {
    constructor() {

        //存储 歌词数据
        this.data = []

        //传入歌曲下标
        this.index = ''
    }

    templateTodo(todo) {
        let { time, lrctxt } = todo
        let t = `
        <p data-time="${time}">${lrctxt}</p>
    `
        return t
    }

    insertTodo(todo) {
        let container = e('.right-lyric-inner')
        let html = this.templateTodo(todo)
        appendHtml(container, html)
    }

    insertTodos(todos) {
        for (let i = 0; i < todos.length; i++) {
            let t = todos[i]
            this.insertTodo(t)
        }
    }

    inser() {
        //获取数据
        let lrcArray = this.data
        //传递给 处理函数
        this.insertTodos(lrcArray)
    }

    // 处理并显示歌词，方法入口
    intLrcHtml(data) {
        this.data = data || []
        let container = e('.right-lyric-inner')
        container.innerHTML = ''

        this.inser()
    }
}

class MusicCanPlay {
    constructor() {
        this.showMusic = new MusicShow()
    }

    //canplay 入口
    intCanPlay() {
        this.showMusic.intShow()
    }
}


// 后补3：可以将事件绑定到更的元素上，使用事件委托
// 当事件发生时，进行判断，响应元素是否是想要的
// 判断 使用 表驱动法
// 事件 应当处理属于自己的事情
class bindEventAudio {
    constructor() {
        this.MusicShow = new MusicShow()
        this.MusicButton = new MusicButton()

        this.MusicPro = new MusicPro()
        this.MusicVol = new MusicVol()

        // DOM元素
        this.audio = e('.music-audio')
        this.audioButton = e('.footer-left')

        this.audiocontrol = e('.footer-centre-progress')
        this.audiovol = e('.vol-inner')
    }

    audioCanplay() {
        let a = this.audio
        a.addEventListener('canplay', () => {
            log('canplay')
            this.MusicShow.intShow()
        })
    }

    audioEnd() {
        let a = this.audio
        a.addEventListener('ended', (event) => {
            log('ended')
            a.currentTime = 0
            a.play()
        })
    }

    audioButtons() {
        let button = this.audioButton
        button.addEventListener('click', (event) => {
            this.MusicButton.intButton(event)
        })
    }

    audioControl() {
        let control = this.audiocontrol
        let m = this.MusicPro
        control.addEventListener('mousemove', (event) => {
            if (m.ide) {
                log('move')
                m.intMove(event)
            }
        })

        control.addEventListener('mousedown', (event) => {
            log('mousedown')
            m.intDown(event)
        })

        control.addEventListener('mouseup', (event) => {
            log('mouseup')
            m.intUp(event)
        })
    }

    // 后补3：音量 和 时长进度条的 事件一模一样，应当做合并处理。
    // 使用事件委托
    audioVol() {
        let vol = this.audiovol
        vol.addEventListener('mouseup', (event) => {
            log('mouseup')
            this.MusicVol.intVolUp(event)
        })
    }

    intAudio() {
        this.audioCanplay()
        this.audioEnd()
        this.audioButtons()
        this.audioControl()
        this.audioVol()
    }
}

//音乐缓冲好，处理的事情
const bindEventCanplay = (audio) => {
    let a = audio
    let m = new MusicShow()
    // m.bindTime()
    a.addEventListener('canplay', () => {
        log('canplay')
        m.intShow()
    })
}

//播放结束事件
const bindEventEnd = (audio) => {
    let a = audio
    a.addEventListener('ended', (event) => {
        log('end')
        a.currentTime = 0
        a.play()
    })
}

//控制台按钮处理 播放 暂停 上一首 下一首
const bindEventButtons = () => {
    let button = e('.footer-left')
    let m = new MusicButton()
    button.addEventListener('click', (event) => {
        m.intButton(event)
    })
}

// 音乐进度条
// 后补1：可写作 类的形式
const bindEventControl = () => {
    let control = e('.footer-centre-progress')
    let m = new MusicPro()
    control.addEventListener('mousemove', (event) => {
        if (m.ide) {
            log('move')
            m.intMove(event)
        }
    })

    control.addEventListener('mousedown', (event) => {
        log('mousedown')
           m.intDown(event)
    })

    control.addEventListener('mouseup', (event) => {
        log('mouseup')
        m.intUp(event)
    })
}

//音量进度条
const bindEventVol = () => {
    let vol = e('.vol-inner')
    let m = new MusicVol()
    vol.addEventListener('mouseup', (event) => {
        log('mouseup')
        m.intVolUp(event)
    })
}

//搜索栏
const bindEventHeaer = () => {
    let heaer = e('.header-button')
    let m = new Music()
    heaer.addEventListener('click', (event) => {
        let input = e('.header-input')
        let v = input.value
        for (let i = 0; i < m.items.length; i++) {
            let s = m.items[i]
            if (v === s.split('.')[0]) {
                musicInt1(s)
            }
        }
    })
}

//事件集合函数
// 后补1：可写作类的形式
const bindEventDelegate = () => {
    // bindEventButtons()
    // bindEventControl()
    // bindEventVol()

    // bindEventEnd(audio)
    // bindEventCanplay(audio)
}

const __main = () => {
    let music = new Mapper(0)
    music.int(0)

    let mu = new bindEventAudio()
    mu.intAudio()

    // bindEventDelegate()
}

__main()
