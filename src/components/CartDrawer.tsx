
import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState<'cod' | 'online'>('cod');

  // Confirm this is your shop's WhatsApp number.
  const WHATSAPP_NUMBER = '923252873391';

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 250;
  const finalTotal = subtotal + shippingFee;

  const handleWhatsAppCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

   if (
  !customerName.trim() ||
  !phone.trim() ||
  !city.trim() ||
  !address.trim()
) {
  alert('Please fill in all delivery details.');
  return;
}

// Phone number must contain exactly 11 digits.
if (!/^03[0-9]{9}$/.test(phone)) {
  alert('Please enter a valid 11-digit Pakistani mobile number, e.g. 03123456789.');
  return;
}

    const messageLines = [
      '*NEW ORDER - DESI GHEE & PANJIRI*',
      '',
      '*CUSTOMER DETAILS*',
      `Name: ${customerName.trim()}`,
      `Phone: ${phone.trim()}`,
      `City: ${city.trim()}`,
      `Address: ${address.trim()}`,
      `Payment: ${paymentMode === 'cod' ? 'Cash on Delivery' : 'Bank / JazzCash'}`,
      '',
      '*ORDER RECEIPT*',
      ...items.map(
        (item, index) =>
          `${index + 1}. ${item.product.name}\nPack size: ${item.selectedWeight.label}\nQuantity: ${item.quantity}\nUnit price: Rs. ${item.price.toLocaleString('en-US')}\nItem total: Rs. ${(item.price * item.quantity).toLocaleString('en-US')}`
      ),
      '',
      `Subtotal: Rs. ${subtotal.toLocaleString('en-US')}`,
      `Delivery fee: Rs. ${shippingFee.toLocaleString('en-US')}`,
      `*GRAND TOTAL: Rs. ${finalTotal.toLocaleString('en-US')}*`,
      '',
      'Please confirm my order and delivery details. Thank you!',
    ];

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messageLines.join('\n')
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCFAF7] border-l border-[#E5DACB] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#2A1406] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h2 className="font-display text-lg font-bold">Your Fresh Bag</h2>
              <span className="text-xs text-amber-200 tabular-nums">
                ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200/70 rounded-xl text-xs text-[#523A29]">
                <p className="font-semibold text-[#8A4616]">
                  A flat delivery fee of Rs. 250 applies to every order.
                </p>
              </div>
            )}

            {isCheckingOut ? (
              <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-2">
                  <h3 className="font-display text-base font-bold text-[#2A1406]">
                    Delivery Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-[#8A5A36] hover:underline cursor-pointer"
                  >
                    ← Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#523A29] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Bilal Khan"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8C7B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#523A29] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                 <input
                        type="tel"
                        required
                        inputMode="numeric"
                        maxLength={11}
                        minLength={11}
                        pattern="03[0-9]{9}"
                        title="Enter exactly 11 digits, starting with 03. Example: 03123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                        placeholder="03123456789"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#D8C7B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#523A29] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Lahore, Karachi, Islamabad"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8C7B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#523A29] mb-1">
                    Complete Street Address & Landmark *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Plot No., Street, Sector/Block, Area"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8C7B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-semibold text-[#523A29] mb-1">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('cod')}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        paymentMode === 'cod'
                          ? 'border-[#2A1406] bg-[#2A1406] text-white shadow-sm'
                          : 'border-[#D8C7B2] bg-white text-[#523A29]'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('online')}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        paymentMode === 'online'
                          ? 'border-[#2A1406] bg-[#2A1406] text-white shadow-sm'
                          : 'border-[#D8C7B2] bg-white text-[#523A29]'
                      }`}
                    >
                      Bank / JazzCash
                    </button>
                  </div>
                </div>

                {/* Order Total */}
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-[#523A29] space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {subtotal.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>Rs. {shippingFee.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-amber-200 pt-1">
                    <span>Total:</span>
                    <span>Rs. {finalTotal.toLocaleString('en-US')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-[#15803D] hover:bg-[#166534] text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    Send Order on WhatsApp (Rs. {finalTotal.toLocaleString('en-US')})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-center text-[#7A5B45]">
                  WhatsApp will open with your receipt. Please press Send there to place your order.
                </p>
              </form>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#BCA58F] mx-auto" />
                <h3 className="font-display text-lg font-bold text-[#2A1406]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#7A5B45] max-w-xs mx-auto">
                  Select from our handcrafted Panjiri varieties or pure cultured Desi Ghee to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#2A1406] rounded-lg hover:bg-[#43200A] cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedWeight.label}`}
                    className="p-3 bg-white border border-[#EBE4D8] rounded-xl flex gap-3 items-center shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-amber-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#2A1406] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#8A5A36]">
                        Pack Size: {item.selectedWeight.label}
                      </p>
                      <div className="text-sm font-semibold text-[#2A1406] font-display tabular-nums mt-0.5">
                        Rs. {(item.price * item.quantity).toLocaleString('en-US')}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#F4EDE2] p-1 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded text-[#523A29] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#2A1406] w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded text-[#523A29] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(index)}
                      className="p-1 text-[#8C6445] hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && !isCheckingOut && (
            <div className="p-6 bg-[#F5EFE6] border-t border-[#E5DACB] space-y-3">
              <div className="space-y-1.5 text-xs text-[#523A29]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold tabular-nums">
                    Rs. {subtotal.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Doorstep Delivery:</span>
                  <span className="font-semibold">
                    Rs. {shippingFee.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2A1406] pt-1 border-t border-[#DCCEC0] font-display">
                  <span>Total Amount:</span>
                  <span className="tabular-nums">
                    Rs. {finalTotal.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-[#2A1406] hover:bg-[#43200A] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
