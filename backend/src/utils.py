import datetime

# Fungsi untuk generate nomor faktur


def generate_invoice_number(last_invoice_number=None):
    # Dapatkan tanggal saat ini dalam format YYYYMMDD
    date_str = datetime.datetime.now().strftime('%Y%m%d')

    if last_invoice_number:
        # Ekstrak angka urut terakhir dari nomor faktur sebelumnya
        last_sequence = int(last_invoice_number.split('-')[-1])
        # Increment angka urut
        next_sequence = last_sequence + 1
    else:
        # Jika tidak ada nomor faktur sebelumnya, mulai dari 1
        next_sequence = 1

    # Format nomor faktur dengan tanggal dan angka urut
    invoice_number = f"INV-{date_str}-{next_sequence:04d}"

    return invoice_number
