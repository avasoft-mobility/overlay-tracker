enum EventTypeEnum {
  // Entry = 1,
  // Processing,
  // Checking,
  // Exit,
  retailer_visited = 1,
  pwa_appearance,
  pwa_clicked,
  zero_otb_popup,
  amount_exceeded_popup,
  amount_exceeded_backtocart,
  non_leasable_popup,
  lease_upadater_appearance,
  updated_lease,
  review_page_appearance,
  review_page_backtocart,
  review_page_keepshopping,
  sign_and_pay_review_appearance,
  sign_and_pay_review_continued,
  agreement_page_appearance,
  agreement_signed,
  initial_payment_appearance,
  initial_payment_made,
  vlc_generated,
  vlc_minimized,
  finish_vlc_popup,
  canceled_lease,
  completed_payment,
  overlay_close_icon_clicked,
  overlay_reload_icon_clicked,
  overlay_previous_icon_clicked,
  overlay_forward_icon_clicked,
  phone_back_navigation_clicked,
}

export default EventTypeEnum;
