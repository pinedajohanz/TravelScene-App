import React from 'react'
import {Box, Flex, HStack, Link, IconButton, Icon, Text, useDisclosure, Stack, useColorMode, useColorModeValue as mode, MenuItem, Menu, MenuList, MenuButton, ButtonGroup, } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import {HamburgerIcon, CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import {GiWorld} from 'react-icons/gi'
// Social Media Icons
import {FaTwitter, FaYoutube, FaFacebook, FaInstagram} from 'react-icons/fa'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {MdAdminPanelSettings} from 'react-icons/md'

// create an array of objects for links 
const links = [
  {linkName: 'About', path: '/about'}, {linkName: 'Contact', path: '/contact'}
]

const blogLinks = [
  {linkName: 'All Blogs', category: 'all'},
  {linkName: 'Latest Blogs', category: 'latest'},
  {linkName: 'America', category: 'america'},
  {linkName: 'Europe', category: 'europe'},
  {linkName: 'Asia', category: 'asia'},
  {linkName: 'Oceania', category: 'oceania'},
  {linkName: 'Africa', category: 'africa'},
]

const NavLink = ({ path, children }) => (
  <Link 
    as={ReactLink} 
    to={path} 
    px='2' 
    py='2' 
    fontWeight='semibold' 
    _hover={{ textDecoration: 'none', bg: mode('blue.100', 'blue.800')}}>
    {children}
  </Link>
)


const Navbar = () => {
  // true or false function with help from Chakra
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {colorMode, toggleColorMode} = useColorMode()
  const [logoHover, setLogoHover] = useState(false)

  return (
    //  This prop is setting the background color of the IconButton component. The actual color value depends on the current theme mode. If the theme mode is LIGHT, it will have a blue background of shade 200 (blue.200), and if the theme mode is DARK, it will have a blue background of shade 900 (blue.900). This likely involves a utility function called mode that selects the appropriate value based on the theme mode.
    <Box bg={mode('blue.200', 'blue.900')} px={4}>
      <Flex h='16' alignItems='center' justifyContent='space-between'>
        {/* conditional statement in icon > isOpen True otherwise*/}
        <IconButton 
          bg={mode('blue.200', 'blue.900')} 
          // If the isOpen variable is true, it will render a <CloseIcon />, indicating that clicking the button will close something. If isOpen is false, it will render a <HamburgerIcon />, indicating that clicking the button will open something. 
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} 
          // This prop controls the display behavior of the IconButton based on screen size or breakpoints. Button should not be displayed ('none') when the screen size is equal to or greater than the 'md' breakpoint. 
          display={{md: 'none'}}
          // When the button is clicked, it will either call the onClose function or the onOpen function, depending on the value of isOpen. If isOpen is true, it will call onClose, and if isOpen is false, it will call onOpen
          onClick={isOpen ? onClose : onOpen}
        />
      
      <HStack>
        {/* Logo Hover */}
        <Link 
          as={ReactLink} 
          to='/' 
          style={{textDecoration: 'none'}} 
          onMouseEnter={() =>setLogoHover(true)} 
          onMouseLeave={() =>setLogoHover(false)}>
            <Flex alignItems='center'>
              {/* ICON color depends on logohover and dark or light mode*/}
              <Icon as={GiWorld} h='10' w='10' color={logoHover ? 'gray,200' : mode('gray.600', 'gray.400')} />
              <Text fontWeight='extrabold' color={mode('gray.600', 'gray.400')}>
                TravelVite
              </Text>
            </Flex>
        </Link>
        <HStack display={{base: 'none', md: 'flex'}} pl='10'>
          {/* .map loops array of links and use component NavLink */}
          {links.map((link) => (
            <NavLink key={link.linkName} path={link.path}>
              {link.linkName}
            </NavLink>
          ))}
          <Menu>
            <MenuButton fontWeight='semibold' p='2' _hover={{bg: mode('blue.100', 'blue.800')}}>
              Blog
            </MenuButton>
            <MenuList>
              {/* map out blogLinks */}
              {blogLinks.map((link) => (
                // when user clicks on it. he will redirect to it
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/${link.category}`}> 
                {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      {/* Horizontal Stack */}
      <HStack>
        <ButtonGroup spacing='0' variant='ghost' mr='3' display={{base: 'none', md: 'flex'}}>
          <IconButton as ='a' href='#' icon={<FaFacebook fontSize='1.25rem'/>} />
          <IconButton as ='a' href='#' icon={<FaTwitter fontSize='1.25rem'/>} />
          <IconButton as ='a' href='#' icon={<FaYoutube fontSize='1.25rem'/>} />
          <IconButton as ='a' href='#' icon={<FaInstagram fontSize='1.25rem'/>} />
        </ButtonGroup>

        <Icon 
          cursor='pointer' 
          // if colorMode is light then display moon if not then display sun
          as={colorMode === 'light' ? MoonIcon : SunIcon} 
          onClick={() => toggleColorMode()} 
          w='40px'
        />
      </HStack>
      </Flex>
      {/* Hamburger icon drop down menu. if it is open then show something else show nothing */}
      {isOpen ? (
        <Box pb='4' display={{ md:'none'}}>
          <Stack as='nav' spacing='4'>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </Stack>
          {/* Blog Button for Hamburger menu with drop down feature */}
          <Menu>
            <MenuButton 
            textAlign='left' 
            w='full' 
            mt='3'
            fontWeight='semibold' 
            p='2' 
            _hover={{bg: mode('blue.100', 'blue.800')}}>
              Blog
            </MenuButton>
            <MenuList>
              {/* map out blogLinks */}
              {blogLinks.map((link) => (
                // when user clicks on it. he will redirect to it
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/${link.category}`}> 
                {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <ButtonGroup spacing='0' variant='ghost' mr='3' mt='5'>
          <IconButton as ='a' href='#' icon={<FaFacebook fontSize='1.25rem'/>} />
          <IconButton as ='a' href='#' icon={<FaTwitter fontSize='1.25rem'/>} />
          <IconButton as ='a' href='#' icon={<FaYoutube fontSize='1.25rem'/>} />
          <IconButton as ='a' href='#' icon={<FaInstagram fontSize='1.25rem'/>} />
        </ButtonGroup>
        </Box>
      ) : null }
    </Box>

  )
}

export default Navbar