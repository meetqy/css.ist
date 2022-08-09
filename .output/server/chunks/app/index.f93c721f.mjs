const BMP = {
  validate(buffer) {
    return buffer.toString("ascii", 0, 2) === "BM";
  },
  calculate(buffer) {
    return {
      height: Math.abs(buffer.readInt32LE(22)),
      width: buffer.readUInt32LE(18)
    };
  }
};
const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(buffer, offset) {
  const value = buffer.readUInt8(offset);
  return value === 0 ? 256 : value;
}
function getImageSize$1(buffer, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(buffer, offset + 1),
    width: getSizeFromOffset(buffer, offset)
  };
}
const ICO = {
  validate(buffer) {
    if (buffer.readUInt16LE(0) !== 0) {
      return false;
    }
    return buffer.readUInt16LE(2) === TYPE_ICON;
  },
  calculate(buffer) {
    const nbImages = buffer.readUInt16LE(4);
    const imageSize = getImageSize$1(buffer, 0);
    if (nbImages === 1) {
      return imageSize;
    }
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(buffer, imageIndex));
    }
    const result = {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
    return result;
  }
};
const TYPE_CURSOR = 2;
const CUR = {
  validate(buffer) {
    if (buffer.readUInt16LE(0) !== 0) {
      return false;
    }
    return buffer.readUInt16LE(2) === TYPE_CURSOR;
  },
  calculate(buffer) {
    return ICO.calculate(buffer);
  }
};
const DDS = {
  validate(buffer) {
    return buffer.readUInt32LE(0) === 542327876;
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32LE(12),
      width: buffer.readUInt32LE(16)
    };
  }
};
const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate(buffer) {
    const signature = buffer.toString("ascii", 0, 6);
    return gifRegexp.test(signature);
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt16LE(8),
      width: buffer.readUInt16LE(6)
    };
  }
};
const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  icp6: 64,
  ic12: 32,
  it32: 128,
  t8mk: 128,
  ic07: 128,
  ic08: 256,
  ic13: 256,
  ic09: 512,
  ic14: 512,
  ic10: 1024
};
function readImageHeader(buffer, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    buffer.toString("ascii", imageOffset, imageLengthOffset),
    buffer.readUInt32BE(imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate(buffer) {
    return buffer.toString("ascii", 0, 4) === "icns";
  },
  calculate(buffer) {
    const bufferLength = buffer.length;
    const fileLength = buffer.readUInt32BE(FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(buffer, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) {
      return imageSize;
    }
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < bufferLength) {
      imageHeader = readImageHeader(buffer, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};
const J2C = {
  validate(buffer) {
    return buffer.toString("hex", 0, 4) === "ff4fff51";
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32BE(12),
      width: buffer.readUInt32BE(8)
    };
  }
};
const BoxTypes = {
  ftyp: "66747970",
  ihdr: "69686472",
  jp2h: "6a703268",
  jp__: "6a502020",
  rreq: "72726571",
  xml_: "786d6c20"
};
const calculateRREQLength = (box) => {
  const unit = box.readUInt8(0);
  let offset = 1 + 2 * unit;
  const numStdFlags = box.readUInt16BE(offset);
  const flagsLength = numStdFlags * (2 + unit);
  offset = offset + 2 + flagsLength;
  const numVendorFeatures = box.readUInt16BE(offset);
  const featuresLength = numVendorFeatures * (16 + unit);
  return offset + 2 + featuresLength;
};
const parseIHDR = (box) => {
  return {
    height: box.readUInt32BE(4),
    width: box.readUInt32BE(8)
  };
};
const JP2 = {
  validate(buffer) {
    const signature = buffer.toString("hex", 4, 8);
    const signatureLength = buffer.readUInt32BE(0);
    if (signature !== BoxTypes.jp__ || signatureLength < 1) {
      return false;
    }
    const ftypeBoxStart = signatureLength + 4;
    const ftypBoxLength = buffer.readUInt32BE(signatureLength);
    const ftypBox = buffer.slice(ftypeBoxStart, ftypeBoxStart + ftypBoxLength);
    return ftypBox.toString("hex", 0, 4) === BoxTypes.ftyp;
  },
  calculate(buffer) {
    const signatureLength = buffer.readUInt32BE(0);
    const ftypBoxLength = buffer.readUInt16BE(signatureLength + 2);
    let offset = signatureLength + 4 + ftypBoxLength;
    const nextBoxType = buffer.toString("hex", offset, offset + 4);
    switch (nextBoxType) {
      case BoxTypes.rreq:
        const MAGIC = 4;
        offset = offset + 4 + MAGIC + calculateRREQLength(buffer.slice(offset + 4));
        return parseIHDR(buffer.slice(offset + 8, offset + 24));
      case BoxTypes.jp2h:
        return parseIHDR(buffer.slice(offset + 8, offset + 24));
      default:
        throw new TypeError("Unsupported header found: " + buffer.toString("ascii", offset, offset + 4));
    }
  }
};
function readUInt(buffer, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return buffer[methodName].call(buffer, offset);
}
const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(buffer) {
  return buffer.toString("hex", 2, 6) === EXIF_MARKER;
}
function extractSize(buffer, index) {
  return {
    height: buffer.readUInt16BE(index),
    width: buffer.readUInt16BE(index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(buffer, index) {
  const exifBlock = buffer.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = exifBlock.toString("hex", EXIF_HEADER_BYTES, EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES);
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateBuffer(buffer, index) {
  if (index > buffer.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
  if (buffer[index] !== 255) {
    throw new TypeError("Invalid JPG, marker table corrupted");
  }
}
const JPG = {
  validate(buffer) {
    const SOIMarker = buffer.toString("hex", 0, 2);
    return SOIMarker === "ffd8";
  },
  calculate(buffer) {
    buffer = buffer.slice(4);
    let orientation;
    let next;
    while (buffer.length) {
      const i = buffer.readUInt16BE(0);
      if (isEXIF(buffer)) {
        orientation = validateExifBlock(buffer, i);
      }
      validateBuffer(buffer, i);
      next = buffer[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(buffer, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      buffer = buffer.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};
const SIGNATURE = "KTX 11";
const KTX = {
  validate(buffer) {
    return SIGNATURE === buffer.toString("ascii", 1, 7);
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32LE(40),
      width: buffer.readUInt32LE(36)
    };
  }
};
const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(buffer) {
    if (pngSignature === buffer.toString("ascii", 1, 8)) {
      let chunkName = buffer.toString("ascii", 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = buffer.toString("ascii", 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(buffer) {
    if (buffer.toString("ascii", 12, 16) === pngFriedChunkName) {
      return {
        height: buffer.readUInt32BE(36),
        width: buffer.readUInt32BE(32)
      };
    }
    return {
      height: buffer.readUInt32BE(20),
      width: buffer.readUInt32BE(16)
    };
  }
};
const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const Signatures = Object.keys(PNMTypes);
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate(buffer) {
    const signature = buffer.toString("ascii", 0, 2);
    return Signatures.includes(signature);
  },
  calculate(buffer) {
    const signature = buffer.toString("ascii", 0, 2);
    const type = PNMTypes[signature];
    const lines = buffer.toString("ascii", 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};
const PSD = {
  validate(buffer) {
    return buffer.toString("ascii", 0, 4) === "8BPS";
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32BE(14),
      width: buffer.readUInt32BE(18)
    };
  }
};
const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72
};
function parseLength(len) {
  const m = /([0-9.]+)([a-z]*)/.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(parseFloat(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  validate(buffer) {
    const str = String(buffer);
    return svgReg.test(str);
  },
  calculate(buffer) {
    const root = buffer.toString("utf8").match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};
function calculateExtended(buffer) {
  return {
    height: 1 + buffer.readUIntLE(7, 3),
    width: 1 + buffer.readUIntLE(4, 3)
  };
}
function calculateLossless(buffer) {
  return {
    height: 1 + ((buffer[4] & 15) << 10 | buffer[3] << 2 | (buffer[2] & 192) >> 6),
    width: 1 + ((buffer[2] & 63) << 8 | buffer[1])
  };
}
function calculateLossy(buffer) {
  return {
    height: buffer.readInt16LE(8) & 16383,
    width: buffer.readInt16LE(6) & 16383
  };
}
const WEBP = {
  validate(buffer) {
    const riffHeader = buffer.toString("ascii", 0, 4) === "RIFF";
    const webpHeader = buffer.toString("ascii", 8, 12) === "WEBP";
    const vp8Header = buffer.toString("ascii", 12, 15) === "VP8";
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(buffer) {
    const chunkHeader = buffer.toString("ascii", 12, 16);
    buffer = buffer.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = buffer[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(buffer);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && buffer[0] !== 47) {
      return calculateLossy(buffer);
    }
    const signature = buffer.toString("hex", 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(buffer);
    }
    throw new TypeError("Invalid WebP");
  }
};
const typeHandlers = {
  bmp: BMP,
  cur: CUR,
  dds: DDS,
  gif: GIF,
  icns: ICNS,
  ico: ICO,
  j2c: J2C,
  jp2: JP2,
  jpg: JPG,
  ktx: KTX,
  png: PNG,
  pnm: PNM,
  psd: PSD,
  svg: SVG,
  webp: WEBP
};
const getMimeType = (type) => {
  if (type === "svg") {
    return "image/svg+xml";
  }
  return `image/${type}`;
};
const keys = Object.keys(typeHandlers);
const firstBytes = {
  56: "psd",
  66: "bmp",
  68: "dds",
  71: "gif",
  73: "tiff",
  77: "tiff",
  82: "webp",
  105: "icns",
  137: "png",
  255: "jpg"
};
function detector(buffer) {
  const byte = buffer[0];
  if (byte in firstBytes) {
    const type = firstBytes[byte];
    if (typeHandlers[type].validate(buffer)) {
      return type;
    }
  }
  const finder = (key) => typeHandlers[key].validate(buffer);
  return keys.find(finder);
}
function lookup(buffer, filepath) {
  const type = detector(buffer);
  if (type && type in typeHandlers) {
    const size = typeHandlers[type].calculate(buffer, filepath);
    if (size !== void 0) {
      size.type = type;
      size.mimeType = getMimeType(type);
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type + " (file: " + filepath + ")");
}
function imageMeta(input) {
  if (Buffer.isBuffer(input)) {
    return lookup(input);
  }
  throw new Error("Input should be buffer!");
}
const types = Object.keys(typeHandlers);

export { imageMeta, types };
//# sourceMappingURL=index.f93c721f.mjs.map
