import stream from 'stream';

export default function(emitter) {
  let s = stream.Writable({ objectMode: true });
  s._write = (chunk, enc, next) => {
    emitter.emit('model', chunk);
    next();
  }
  return s;
}
