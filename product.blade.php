<div class="swiper-slide">
    @if ($product->cost_discount)
        <div class="flash-save-offer">
            <span>{{ __('web.save') }}</span>
            <span>{{ 100 - $product->percentage }}%</span>
        </div>
    @endif
    <div class="slide-container">
        <div class="flash-pro-img">
            <a href="{{$product->url}}">
                <img src="{{asset($product->image_url)}}" alt="{{$product->name}}" loading="lazy">
            </a>
            <a onclick="toggleFavorite(this)" data-id="{{ $product->id }}" class="heartIconLink">
                <svg id="heartIcon" onclick="redHeart(this)" width="21" height="18" viewBox="0 0 21 18"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="heart @if ($product->favorited()) filled @endif"
                          d="M10.5 4.15428C8.5 -0.540161 1.5 -0.0401611 1.5 5.95987C1.5 11.9599 10.5 16.9601 10.5 16.9601C10.5 16.9601 19.5 11.9599 19.5 5.95987C19.5 -0.0401611 12.5 -0.540161 10.5 4.15428Z"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>
        <div class="flash-pro-info">
            <div class="cat-stars">
                <a href="{{ route('web.shop', $product->category->slug) }}">{{ $product->category->details->title }}</a>
                <div class="stars">
                    @if ($product->rates['rate'] != 0)
                        @include('web.component.rate.rateComponent', [
                         'rate' => $product->rates['rate'],
                         ])
                    @endif

                </div>
            </div>
            <a href="{{ $product->url }}" style="display: block; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; max-height: 3em; line-height: 1.5em; text-overflow: ellipsis;">{{ $product->name }}</a>
        </div>
        <div class="flash-pro-price">
            @if($product->cost_discount)
                <div>
                    <span>{{ $product->cost_discount }} {{ __('web.L.E') }} /</span>
                    <span>{{__('web.'.$product->type)}}</span>
                </div>
                <span>{{ $product->cost }} {{ __('web.L.E') }}  </span>
            @else
                <div>
                    <span>{{ $product->cost }} {{ __('web.L.E') }} /</span>
                    <span>{{__('web.'.$product->type)}}</span>
                </div>
                <span>&nbsp;</span>

            @endif
        </div>
        <div class="flsh-pro-buttons">
            @include('web.Ajax.cart_button')


            <a onclick="addCompare(this)" data-id="{{ $product->id }}">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4"
                          d="M9.5 14.15V16.85C9.5 19.1 8.6 20 6.35 20H3.65C1.4 20 0.5 19.1 0.5 16.85V14.15C0.5 11.9 1.4 11 3.65 11H6.35C8.6 11 9.5 11.9 9.5 14.15Z"
                          fill="#FD9636" />
                    <path opacity="0.4"
                          d="M16 9C18.4853 9 20.5 6.98528 20.5 4.5C20.5 2.01472 18.4853 0 16 0C13.5147 0 11.5 2.01472 11.5 4.5C11.5 6.98528 13.5147 9 16 9Z"
                          fill="#FD9636" />
                    <path
                            d="M13.2805 20C13.0105 20 12.7605 19.85 12.6305 19.62C12.5005 19.38 12.5005 19.1 12.6405 18.86L13.6105 17.24C13.8205 16.88 14.2805 16.77 14.6405 16.98C15.0005 17.19 15.1105 17.65 14.9005 18.01L14.7205 18.31C17.1905 17.67 19.0105 15.43 19.0105 12.77C19.0105 12.36 19.3505 12.02 19.7605 12.02C20.1705 12.02 20.5005 12.36 20.5005 12.78C20.5005 16.76 17.2605 20 13.2805 20Z"
                            fill="#FD9636" />
                    <path
                            d="M1.25 7.97C0.84 7.97 0.5 7.64 0.5 7.22C0.5 3.24 3.74 0 7.72 0C8 0 8.24 0.15 8.38 0.38C8.51 0.62 8.51 0.9 8.37 1.14L7.4 2.75C7.18 3.11 6.72 3.23 6.37 3.01C6.01 2.8 5.9 2.34 6.11 1.98L6.29 1.68C3.83 2.32 2 4.56 2 7.22C2 7.64 1.66 7.97 1.25 7.97Z"
                            fill="#FD9636" />
                </svg>
            </a>

            <a href="#" class="openProductModal" data-id="{{ $product->id }}" onclick="quickView(this)">
                <svg width="21" height="18" viewBox="0 0 21 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                            d="M10.5004 11.8499C12.0744 11.8499 13.3504 10.5739 13.3504 8.9999C13.3504 7.42589 12.0744 6.1499 10.5004 6.1499C8.92638 6.1499 7.65039 7.42589 7.65039 8.9999C7.65039 10.5739 8.92638 11.8499 10.5004 11.8499Z"
                            fill="#FD9636" />
                    <path opacity="0.3"
                          d="M10.5004 11.8499C12.0744 11.8499 13.3504 10.5739 13.3504 8.9999C13.3504 7.42589 12.0744 6.1499 10.5004 6.1499C8.92638 6.1499 7.65039 7.42589 7.65039 8.9999C7.65039 10.5739 8.92638 11.8499 10.5004 11.8499Z"
                          fill="#FD9636" />
                    <path
                            d="M10.5 0.439941C5.77 0.439941 0.5 5.05994 0.5 8.99994C0.5 12.7599 5.77 17.5599 10.5 17.5599C15.5 17.5599 20.5 12.9699 20.5 8.99994C20.5 5.17994 15.23 0.439941 10.5 0.439941ZM10.5 13.3499C9.63965 13.3499 8.79862 13.0948 8.08327 12.6168C7.36792 12.1389 6.81037 11.4595 6.48112 10.6646C6.15188 9.86975 6.06574 8.99512 6.23358 8.1513C6.40143 7.30748 6.81573 6.53239 7.42409 5.92403C8.03244 5.31567 8.80754 4.90137 9.65136 4.73353C10.4952 4.56568 11.3698 4.65182 12.1647 4.98107C12.9595 5.31031 13.6389 5.86786 14.1169 6.58321C14.5949 7.29856 14.85 8.13959 14.85 8.99994C14.85 10.1536 14.3917 11.2601 13.5759 12.0759C12.7601 12.8916 11.6537 13.3499 10.5 13.3499Z"
                            fill="#FD9636" />
                </svg>

            </a>
        </div>
        <div class="flash-pro-delivery">
            @if($product->items)
                @foreach($product->items as $item)
                    {{$item->details->name}}
                @endforeach

            @endif

        </div>
    </div>
</div>

@include('web.component.product.productExtention',['product'=>$product])