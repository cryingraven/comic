import React from 'react'

const PrivacyPolicyPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center container mx-auto my-5">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full">
				<h2 className="text-2xl font-bold mb-4">KEBIJAKAN PRIVASI</h2>
				<div className="space-y-6">
					<div>
						<h3 className="text-xl font-semibold mb-2">
							WEB SERVER LOGGING DAN ALAMAT IP
						</h3>
						<p className="text-gray-700">
							Website dan/ atau Aplikasi 24comic dari kami memantau data
							penggunaan, baik dengan atau tanpa cookies, seperti alamat sumber
							dari mana suatu permintaan halaman berasal (yaitu alamat IP dan
							nama domain Anda), tanggal dan waktu permintaan halaman tersebut,
							situs web referensi (jika ada), dan parameter-parameter lain pada
							URL (misalnya kriteria pencarian). Kami menggunakan data ini untuk
							lebih dapat memahami penggunaan situs web secara keseluruhan dan
							untuk menentukan bagian-bagian dari situs-situs web kami yang
							lebih disukai para pengguna (misalnya berdasarkan jumlah kunjungan
							ke bagian-bagian tersebut). Informasi ini disimpan dalam rekaman
							aktivitas transaksi koneksi (log file) dan digunakan oleh 24comic
							untuk pelaporan statistik. Pengumpulan data pada situs ini
							menggunakan layanan dari Pihak Ketiga yang dalam hal ini adalah
							Google Analytics.
						</p>
					</div>
					<div>
						<h3 className="text-xl font-semibold mb-2">KEAMANAN DAN PRIVASI</h3>
						<ol className="list-decimal list-inside space-y-2">
							<li className="text-gray-700">
								Kami melakukan tindakan pencegahan yang wajar untuk memelihara
								perlindungan atas informasi identifikasi pribadi (personally
								identifiable information) yang dikumpulkan melalui Website dan/
								atau Aplikasi 24comic yang digunakan sesuai dengan Kebijakan
								Keamanan dan Privasi ini. Selain pengaman teknis, kami juga
								menggunakan pengendalian dan prosedur fisik untuk menjaga
								keamanan informasi identifikasi pribadi (personally identifiable
								information) Anda, maka Anda dianggap setuju untuk menerima
								langkah-langkah pengamanan kami sebagaimana dijelaskan di atas.
							</li>
							<li className="text-gray-700">
								Kami berkomitmen untuk melindungi privasi pelanggan-pelanggan
								Kami di Indonesia. Kebijakan Privasi Kami berlaku untuk semua
								informasi yang dikumpulkan oleh kami atau dikirimkan kepada kami
								melalui Website dan/atau Aplikasi 24comic. Kami tidak dengan
								sengaja mengumpulkan Informasi Pribadi dari anak-anak dibawah
								batas usia Pengguna yang sudah Kami tentukan (usia 13 tahun).
								Setiap orang tua atau wali yang meyakini bahwa seorang anak
								mungkin telah memberikan informasi pribadi ke Kami harus
								menghubungi 24comic.com@gmail.com . Dalam kasus tersebut, Kami
								akan segera mengambil tindakan yang diperlukan untuk menghapus
								informasi lpribadi dari anak-anak dibawah usia 13tahun tersebut.
							</li>
						</ol>
					</div>
					<div>
						<h3 className="text-xl font-semibold mb-2">PERUBAHAN</h3>
						<p className="text-gray-700">
							Kami dapat mengubah Kebijakan Privasi berdasarkan kebijaksanaan
							kami sendiri dengan tanpa pemberitahuan atau penjelasan terlebih
							dahulu kepada dan setelah tanggal efektif dari setiap perubahan
							tersebut yang menyatakan bahwa Anda telah menyetujui keterikatan
							dengan perubahan tersebut.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PrivacyPolicyPage
