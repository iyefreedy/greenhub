import datetime


def generate_invoice_number(last_invoice_number=None):
    date_str = datetime.datetime.now().strftime('%Y%m%d')

    if last_invoice_number:
        last_sequence = int(last_invoice_number.split('-')[-1])
        next_sequence = last_sequence + 1
    else:
        next_sequence = 1

    invoice_number = f"INV-{date_str}-{next_sequence:04d}"

    return invoice_number
