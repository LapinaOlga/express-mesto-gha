module.exports.validateUrl = (v) => typeof v === 'string' && v.match(/^https?:\/\/(?:([-\w_]+)\.)+[a-z]{2,}(?:\/[-._~:?#[\]@!$&'()*+,;=\w]*)*/i);
