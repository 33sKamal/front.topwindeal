/**
 * Customer API data is loaded in the browser only so refresh/navigation always
 * hits the Laravel API directly (avoids empty SSR payload + cache races).
 */
export function useCustomerPageDataOptions() {
  return {
    server: false,
  }
}
