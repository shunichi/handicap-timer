class WebAudio {
  private context: AudioContext;
  private buffers: Map<string, AudioBuffer>;

  constructor() {
    this.context = new(window.AudioContext || window.webkitAudioContext)();
    this.buffers = new Map<string, AudioBuffer>();
    this.playSilent();
    this.loadFiles();
  }

  play(name: string) {
    const audioBuffer = this.buffers.get(name);
    if (audioBuffer == null) return;
    const { context } = this;
    const src = context.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(context.destination);
    src.start(0);
  }

  playSilent() {
    const { context } = this;
    const buffer = context.createBuffer(1, 1, 22050);
    const src = context.createBufferSource();
    src.buffer = buffer;
    src.connect(context.destination);
    src.start(0);
  }

  loadFiles() {
    const beepPathDiv = document.querySelector<HTMLDivElement>("[data-beep-path]");
    if (beepPathDiv == null) return;
    const beepPath = beepPathDiv.dataset.beepPath;
    if (beepPath == null) return;
    this.loadFile("beep", beepPath);
  }

  loadFile(name: string, path: string) {
    fetch(path).then((response) => {
      return response.arrayBuffer();
    }).then((buffer) => {
      this.context.decodeAudioData(buffer, (audioBuffer) => {
        this.buffers.set(name, audioBuffer);
      });
    })
  }
}

let webAudio: WebAudio | undefined = undefined;

export const getWebAudio = (): WebAudio => {
  if (webAudio != null) {
    return webAudio;
  }
  webAudio = new WebAudio();
  return webAudio;
}
