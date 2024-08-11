### Start

##### Các file sử dụng ở branch
###### 1. /src/configs/i18n.ts
###### 2. /locales/vi.json
###### 3. /src/views/layouts/components/user-dropdown/UserDropdown.tsx
###### 4. /src/views/layouts/components/translate-dropdown/TranslateDropdown.tsx
###### 5. /src/views/layouts/VerticalLayout.tsx


#### Chi tiết:
###### 1. /src/configs/i18n.ts
1. Thêm use(BackEnd) để i18n hiểu các file /locales/vi.json

###### 2. /locales/vi.json
1. Định nghĩa các text cần translate

###### 3. /src/views/layouts/components/user-dropdown/UserDropdown.tsx
1. Sử dụng bằng cách goi props t in hook translation rồi truyen vào key config ở vi.json/en.json ở 2.

###### 4. /src/views/layouts/components/translate-dropdown/TranslateDropdown.tsx
1. Custom giao diện de hien thi translate icon
2. Nguoi dung se chon ngon ngu o day
3. Nhung component vao VerticalLayout.tsx để hiển thị

###### 5. /src/views/layouts/VerticalLayout.tsx
1. Nhúng file TranslateDropdown vào để suwr dung

### End