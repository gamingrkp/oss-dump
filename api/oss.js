var axios = require("axios");
const fs = require('fs');

async function getUserData(userId, callback) {
	var options = {
		method: 'POST',
		url: 'https://api-prd.oss.go.id/v1/izin/main/getDetailPermohonan',
		headers: {
			cookie: 'Path=%2F; 3bc3e6faee843332e039b711448addef=918d532376a44a6420002406cff78e2a; TS49de8a9b027=0835be6e41ab20004d696356fa3ee9be1e59f13ac0f3efe12f763eb2a27705147fb08571ebf88ccc08f6c4d075113000934735aaf00836e6f06a3e9add64889ac72033103ab2ecc512c1746c4984a4bdaaac0d3fdb2cbe5614214817b762172e',
			Host: 'api-prd.oss.go.id',
			'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
			'Content-Type': 'application/json',
			user_key: '846ee507525c6b00d18733e066bd5686',
			'sec-ch-ua-mobile': '?0',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
			'sec-ch-ua-platform': '"Windows"',
			Accept: '*/*',
			Origin: 'https://perizinan.oss.go.id',
			'Sec-Fetch-Site': 'same-site',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Dest': 'empty',
			Referer: 'https://perizinan.oss.go.id/',
			'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
		},
		data: {dataPermohonan: {id_profile: userId}}
	};

	try {
		const response = await axios.request(options);
		callback();
		if (response.data.status == 200) {
			console.log(`Success ${userId}: ${response.data.data.dataProfile.nama}`);

			// Write to file
			let toWrite = response.data.data
			fs.writeFile(`./files/user-${userId}.json`, JSON.stringify(toWrite, null, 2), err => {
				if (err) {
					console.error(`failed to write: ${userId}\n`)
				};
			});
		};
	} catch (error) {
		console.log(`error in ${userId}`)
		callback();
	};
};

module.exports = {
	getUserData
}
