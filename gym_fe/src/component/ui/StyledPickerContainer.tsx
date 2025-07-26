import { styled } from '@mui/material/styles'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { PickersLayout, PickersLayoutProps } from '@mui/x-date-pickers/PickersLayout';
import dayjs, { Dayjs } from 'dayjs';
/* Because of the structure of the DesktopDatePicker and the way the popper renders, the
`layout` slot will need to be replaced with a wtyled component */
const StyledPickersLayout = styled(
  PickersLayout<Dayjs> // 👈 gán generic rõ ràng
)<PickersLayoutProps<Dayjs>>({
  '.MuiPickersCalendarHeader-switchViewIcon': {
    color: '#1565c0',
    backgroundColor: '#bbdefb',
    borderRadius: 2,
    border: '0px solid #2196f3',
  }
});

export default function StyledPickerContainer() {
  return (
    <DesktopDatePicker 
      slots={{
        layout: StyledPickersLayout,
      }} 
    />
  );
}