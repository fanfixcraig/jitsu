import * as React from "react"

function Svg(props) {
    return (
        <svg width="100%" height="100%" viewBox="0 0 39 23" fill="none" xmlns="http://www.w3.org/2000/svg"
             className="wccom-woocommerce-logo" role="img" aria-label="WooCommerce Logo">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M34.7091 0H3.55239C1.58064 0 -0.0155347 1.61182 0.000114089 3.56792V15.461C0.000114089 17.4327 1.59629 19.0289 3.56804 19.0289H18.3248L25.0695 22.7846L23.5359 19.0289H34.7091C36.6809 19.0289 38.277 17.4327 38.277 15.461V3.56792C38.277 1.59617 36.6809 0 34.7091 0ZM2.89521 2.75418C2.45704 2.78548 2.12841 2.94197 1.90933 3.23929C1.69025 3.52097 1.61201 3.88089 1.65895 4.28776C2.58223 10.1561 3.44291 14.1152 4.241 16.1652C4.55398 16.9163 4.9139 17.2763 5.33642 17.245C5.99366 17.198 6.7761 16.2904 7.69938 14.5221C8.18449 13.5205 8.93564 12.0183 9.95281 10.0152C10.7978 12.9728 11.9558 15.195 13.4112 16.6816C13.8181 17.1041 14.2406 17.2919 14.6474 17.2606C15.0074 17.2293 15.289 17.0415 15.4768 16.6972C15.6333 16.3999 15.6959 16.0556 15.6646 15.6644C15.5707 14.2404 15.7116 12.253 16.1028 9.70224C16.5096 7.07325 17.0104 5.17974 17.6207 4.05303C17.7459 3.8183 17.7928 3.58356 17.7772 3.30189C17.7459 2.94196 17.5894 2.64464 17.2921 2.40991C16.9948 2.17518 16.6661 2.06564 16.3062 2.09693C15.8524 2.12823 15.5081 2.34731 15.2734 2.78548C14.3032 4.55379 13.6146 7.41752 13.2078 11.3923C12.6131 9.89003 12.1123 8.12171 11.7211 6.04042C11.549 5.11715 11.1265 4.67898 10.4379 4.72593C9.96845 4.75722 9.57724 5.0702 9.26426 5.66485L5.83718 12.1904C5.27382 9.92132 4.74176 7.15149 4.25665 3.88089C4.14711 3.06716 3.69329 2.69158 2.89521 2.75418ZM33.0504 3.88094C34.1615 4.11568 34.9909 4.71033 35.5542 5.6962C36.055 6.54124 36.3053 7.55841 36.3053 8.77901C36.3053 10.3908 35.8985 11.8618 35.0847 13.2076C34.1458 14.7725 32.9252 15.5549 31.4073 15.5549C31.1413 15.5549 30.8596 15.5236 30.5622 15.461C29.4512 15.2263 28.6218 14.6317 28.0584 13.6458C27.5577 12.7851 27.3073 11.7523 27.3073 10.5473C27.3073 8.9355 27.7142 7.46451 28.5279 6.13437C29.4825 4.56949 30.7031 3.78705 32.2054 3.78705C32.4714 3.78705 32.7531 3.81835 33.0504 3.88094ZM32.3932 12.3469C32.9722 11.8305 33.3634 11.0637 33.5825 10.0309C33.6451 9.67099 33.692 9.27977 33.692 8.8729C33.692 8.41909 33.5981 7.93398 33.4103 7.44886C33.1756 6.83856 32.8626 6.50994 32.487 6.43169C31.9237 6.32215 31.376 6.63513 30.8596 7.40192C30.4371 7.99657 30.171 8.62252 30.0302 9.26412C29.9519 9.62405 29.9206 10.0153 29.9206 10.4065C29.9206 10.8603 30.0145 11.3454 30.2023 11.8305C30.4371 12.4408 30.75 12.7694 31.1256 12.8477C31.5168 12.9259 31.9393 12.7538 32.3932 12.3469ZM25.7424 5.6962C25.179 4.71033 24.334 4.11568 23.2386 3.88094C22.9412 3.81835 22.6596 3.78705 22.3935 3.78705C20.8913 3.78705 19.6707 4.56949 18.7161 6.13437C17.9023 7.46451 17.4955 8.9355 17.4955 10.5473C17.4955 11.7523 17.7459 12.7851 18.2466 13.6458C18.81 14.6317 19.6394 15.2263 20.7504 15.461C21.0477 15.5236 21.3294 15.5549 21.5955 15.5549C23.1134 15.5549 24.334 14.7725 25.2729 13.2076C26.0867 11.8618 26.4935 10.3908 26.4935 8.77901C26.4935 7.55841 26.2431 6.54124 25.7424 5.6962ZM23.7706 10.0309C23.5516 11.0637 23.1603 11.8305 22.5813 12.3469C22.1275 12.7538 21.705 12.9259 21.3138 12.8477C20.9382 12.7694 20.6252 12.4408 20.3905 11.8305C20.2027 11.3454 20.1088 10.8603 20.1088 10.4065C20.1088 10.0153 20.1401 9.62405 20.2184 9.26412C20.3592 8.62252 20.6252 7.99657 21.0477 7.40192C21.5642 6.63513 22.1119 6.32215 22.6752 6.43169C23.0508 6.50994 23.3638 6.83856 23.5985 7.44886C23.7863 7.93398 23.8802 8.41909 23.8802 8.8729C23.8802 9.27977 23.8489 9.67099 23.7706 10.0309Z"
                      fill="#7f54b3"></path>
        </svg>
    )
}

export default Svg