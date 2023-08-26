module.exports.validateUrl = (v) => typeof v === 'string' && /^https?:\/\/(?:([-\w_]+)\.)+[a-z]{2,}(?:\/[-._~:?#[\]@!$&'()*+,;=\w]*)*$/i.test(v);
