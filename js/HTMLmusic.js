class MusicHtml {
    constructor() {

        /*  初始化audio标签，与 songtimenow 不同之处在于
            切换音乐时，会触发 canplay 事件，在监听事件的函数中
            进行音乐信息的初始化，即可切换 音乐信息。
            而在一首音乐播放过程中，除非在循环中，新建类的实例
            来反复使用 保存在类的属性 值 中的方法（也就是函数）获取新的值

            比如音乐现在的播放时间，是一个动态值，
            在播放中，会随时间发生变化。

            否则，如果类的实例 在监听函数，的回调函数之前定义，
            就只会获取 实例在 初始化 时，获取到的，
            动态值，当时的 唯一静态值

            用人话说就是，
            如果类的实例 在监听函数，的回调函数之前定义，
            比如
            let m = new music()
            addEVntlister('timeupdate', () => {
                m.方法（）
            })
            m.方法，会在时间变化是，调用，会在一秒内调用几次。
            此时
            父类中的 this.songtimenow = this.audio.currentTime
            只会调用一次 audio.currentTime，比如音乐时间现在是 10s
            实例 m 中，需要用到 audio.currentTime 的地方，或者函数中
            this.songtimenow 值 始终为 10
            不会动态的发生变化
         */
        this.audio = e('.music-audio')

        //取出存在 audio标签，自定义属性中的 歌曲下标
        // this.dataIndex = parseInt(this.audio.dataset.active, 10)
        // this.dataIndex = 0


        //选中开始，与暂停按钮，控制显示与否
        this.eles = es('.show-button')
        this.playButton = ('.play')
        this.pauseButton = ('.pause')

        //选中需要显示歌曲名字, 歌手姓名的地方
        this.names = es('.song-name')
        this.songer = e('.songlist-centre')


        // 播放器时间进度条参数
        this.playdrag = 390
        this.sli = e('.player-slider')
        this.pro = e('.player-progressbar')


        // 音量控制参数
        this.vollength = 1100
        this.volsli = e('.vol-inner-slider')
        this.volpro = e('.vol-inner-progressbar')

        // 更新加载完成 歌曲 的长度
        this.musiclength = es('.song-length')
        // 歌曲未播放 长度为零
        this.muscitime = e('.song-time')
        // 缓冲条
        this.buffer = e('.player-buffer')


        //歌词显示 参数 （需要改下属性名字）
        this.lrcInner = e('.right-lyric-inner')
        // this.lrcP = findAll(this.lrcInner, 'p')

        /*  此处设置 音乐播放时间初始值，之后如果循环使用，则在循环体中
            使用 this.songtimenow = this.audio.currentTime
            否则会一直 使用初始值。假如在此处写为 = this.audio.currentTime
            之后继承的类中，调用属性值，只会获取一次，除非在循环里
            反复 新建类的实例，来反复调用 父类的 this.audio.currentTime
            来获取值*/
        this.songtimenow = 0

        // 绑定事件函数，需要的 DOM 元素
        // 后补2：用事件委托
    }
}