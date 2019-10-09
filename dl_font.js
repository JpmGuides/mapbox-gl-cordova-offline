const fs = require('fs');
const util = require('util');
const request = require('request');

const symlink = util.promisify(fs.symlink);
const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);

const baseUrl = "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=e7trAnc5053j8mX60MlQ"

const fontDir = 'www/fonts/';

async function downloadToFile(url, file) {
  try {
    await stat(file);
  } catch(err) {
    console.log(`Downloading ${url} to ${file}`);
    await new Promise((resolve, reject) => {
      request(url)
	.on('error', reject)
	.pipe(fs.createWriteStream(file))
	.on('finish', resolve);
    });
  }
}

const ranges = [
  "0-255",
  "1024-1279",
  "10240-10495",
  "10496-10751",
  "10752-11007",
  "11008-11263",
  "11264-11519",
  "11520-11775",
  "11776-12031",
  "12032-12287",
  "12288-12543",
  "12544-12799",
  "1280-1535",
  "12800-13055",
  "13056-13311",
  "13312-13567",
  "13568-13823",
  "13824-14079",
  "14080-14335",
  "14336-14591",
  "14592-14847",
  "14848-15103",
  "15104-15359",
  "1536-1791",
  "15360-15615",
  "15616-15871",
  "15872-16127",
  "16128-16383",
  "16384-16639",
  "16640-16895",
  "16896-17151",
  "17152-17407",
  "17408-17663",
  "17664-17919",
  "1792-2047",
  "17920-18175",
  "18176-18431",
  "18432-18687",
  "18688-18943",
  "18944-19199",
  "19200-19455",
  "19456-19711",
  "19712-19967",
  "19968-20223",
  "20224-20479",
  "2048-2303",
  "20480-20735",
  "20736-20991",
  "20992-21247",
  "21248-21503",
  "21504-21759",
  "21760-22015",
  "22016-22271",
  "22272-22527",
  "22528-22783",
  "22784-23039",
  "2304-2559",
  "23040-23295",
  "23296-23551",
  "23552-23807",
  "23808-24063",
  "24064-24319",
  "24320-24575",
  "24576-24831",
  "24832-25087",
  "25088-25343",
  "25344-25599",
  "256-511",
  "2560-2815",
  "25600-25855",
  "25856-26111",
  "26112-26367",
  "26368-26623",
  "26624-26879",
  "26880-27135",
  "27136-27391",
  "27392-27647",
  "27648-27903",
  "27904-28159",
  "2816-3071",
  "28160-28415",
  "28416-28671",
  "28672-28927",
  "28928-29183",
  "29184-29439",
  "29440-29695",
  "29696-29951",
  "29952-30207",
  "30208-30463",
  "30464-30719",
  "3072-3327",
  "30720-30975",
  "30976-31231",
  "31232-31487",
  "31488-31743",
  "31744-31999",
  "32000-32255",
  "32256-32511",
  "32512-32767",
  "32768-33023",
  "33024-33279",
  "3328-3583",
  "33280-33535",
  "33536-33791",
  "33792-34047",
  "34048-34303",
  "34304-34559",
  "34560-34815",
  "34816-35071",
  "35072-35327",
  "35328-35583",
  "35584-35839",
  "3584-3839",
  "35840-36095",
  "36096-36351",
  "36352-36607",
  "36608-36863",
  "36864-37119",
  "37120-37375",
  "37376-37631",
  "37632-37887",
  "37888-38143",
  "38144-38399",
  "3840-4095",
  "38400-38655",
  "38656-38911",
  "38912-39167",
  "39168-39423",
  "39424-39679",
  "39680-39935",
  "39936-40191",
  "40192-40447",
  "40448-40703",
  "40704-40959",
  "4096-4351",
  "40960-41215",
  "41216-41471",
  "41472-41727",
  "41728-41983",
  "41984-42239",
  "42240-42495",
  "42496-42751",
  "42752-43007",
  "43008-43263",
  "43264-43519",
  "4352-4607",
  "43520-43775",
  "43776-44031",
  "44032-44287",
  "44288-44543",
  "44544-44799",
  "44800-45055",
  "45056-45311",
  "45312-45567",
  "45568-45823",
  "45824-46079",
  "4608-4863",
  "46080-46335",
  "46336-46591",
  "46592-46847",
  "46848-47103",
  "47104-47359",
  "47360-47615",
  "47616-47871",
  "47872-48127",
  "48128-48383",
  "48384-48639",
  "4864-5119",
  "48640-48895",
  "48896-49151",
  "49152-49407",
  "49408-49663",
  "49664-49919",
  "49920-50175",
  "50176-50431",
  "50432-50687",
  "50688-50943",
  "50944-51199",
  "512-767",
  "5120-5375",
  "51200-51455",
  "51456-51711",
  "51712-51967",
  "51968-52223",
  "52224-52479",
  "52480-52735",
  "52736-52991",
  "52992-53247",
  "53248-53503",
  "53504-53759",
  "5376-5631",
  "53760-54015",
  "54016-54271",
  "54272-54527",
  "54528-54783",
  "54784-55039",
  "55040-55295",
  "55296-55551",
  "55552-55807",
  "55808-56063",
  "56064-56319",
  "5632-5887",
  "56320-56575",
  "56576-56831",
  "56832-57087",
  "57088-57343",
  "57344-57599",
  "57600-57855",
  "57856-58111",
  "58112-58367",
  "58368-58623",
  "58624-58879",
  "5888-6143",
  "58880-59135",
  "59136-59391",
  "59392-59647",
  "59648-59903",
  "59904-60159",
  "60160-60415",
  "60416-60671",
  "60672-60927",
  "60928-61183",
  "61184-61439",
  "6144-6399",
  "61440-61695",
  "61696-61951",
  "61952-62207",
  "62208-62463",
  "62464-62719",
  "62720-62975",
  "62976-63231",
  "63232-63487",
  "63488-63743",
  "63744-63999",
  "6400-6655",
  "64000-64255",
  "64256-64511",
  "64512-64767",
  "64768-65023",
  "65024-65279",
  "65280-65535",
  "6656-6911",
  "6912-7167",
  "7168-7423",
  "7424-7679",
  "768-1023",
  "7680-7935",
  "7936-8191",
  "8192-8447",
  "8448-8703",
  "8704-8959",
  "8960-9215",
  "9216-9471",
  "9472-9727",
  "9728-9983",
  "9984-10239",
];

async function downloadFont(folder, fontName) {
  for (let range of ranges) {
    const url = baseUrl
		  .replace('{fontstack}', encodeURIComponent(fontName))
		  .replace('{range}', range);
    await downloadToFile(url, folder + '/' + range + '.pbf');
  }
}

async function installFont(localUrl) {
  // Example: file:///android_asset/www/fonts/Metropolis%20Regular,Noto%20Sans%20Regular/0-255.pbf
  const m = localUrl.match(/www\/fonts\/(.*)\/([0-9-]*)\.pbf/);
  if (m) {
    const fontstack = decodeURIComponent(m[1]);

    const fontNames = fontstack.split(',');

    const folder = 'www/fonts/' + fontNames[0];

    try {
      await mkdir(folder);
    } catch (err) { }

    if (fontNames.length > 1) {
      try {
	await symlink(fontNames[0], fontDir + fontstack);
      } catch (err) { }
    }
    await downloadFont(folder, fontNames[0]);
  }
}

async function main(argv) {
  try {
    for (let i = 2; i < argv.length; ++i) {
      await installFont(argv[i]);
    }
  } catch(err) {
    console.warn(err);
  }
}

main(process.argv);
