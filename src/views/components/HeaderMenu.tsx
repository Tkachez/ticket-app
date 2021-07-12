import React, {FC} from 'react'

//material imports
import {Menu, MenuItem} from '@material-ui/core'

type Props = {
    menu: boolean,
    anchor: any
}

const HeaderMenu: FC<Props> = ({menu, anchor}) => {
    return (
        <>
            <Menu open={menu} id='header-menu' anchorEl={anchor}>
                <MenuItem>Hello</MenuItem>
            </Menu>
        </>
    )
}

export default HeaderMenu