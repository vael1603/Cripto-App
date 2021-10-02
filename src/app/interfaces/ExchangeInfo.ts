export interface ExchangeInfo {
    exchange_id: string;
    website: string;
    name: string;
    data_start: string;
    data_end: string;
    data_quote_start: string;
    data_quote_end: string;
    data_symbols_count: number;
    volume_1hrs_usd: number;
    volume_1day_usd: number;
    volume_1mth_usd: number;
    data_orderbook_start: string;
    data_orderbook_end: string;
    data_trade_start: string;
    data_trade_end: string;
}