export const useFormatters = () => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatCPF = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 10) {
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
    }
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
  }

  const formatCEP = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    return digits.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
  }

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
  }

  const formatCardExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    return digits.replace(/(\d{2})(\d{1,2})/, '$1/$2')
  }

  return {
    formatCurrency,
    formatCPF,
    formatPhone,
    formatCEP,
    formatCardNumber,
    formatCardExpiry
  }
}
