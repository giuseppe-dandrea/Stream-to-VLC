# Compile this file with NSIS compiler

# define the name of the installer
Outfile "StreamToVlcInstaller.exe"

!include LogicLib.nsh
!include MUI2.nsh
!define MUI_PAGE_HEADER_TEXT "StreamToVlc installation"
!define MUI_PAGE_HEADER_SUBTEXT "Choose the folder in which VLC is installed."
!define MUI_DIRECTORYPAGE_TEXT_TOP "The installer will use the VLC default installation folder. If you installed VLC in another folder click Browse and select another folder. Click Next to continue and follow the instructions to complete the installation."
!define MUI_DIRECTORYPAGE_TEXT_DESTINATION "VLC Folder"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_LANGUAGE English


Function openLinkNewWindow
  Push $3
  Exch
  Push $2
  Exch
  Push $1
  Exch
  Push $0
  Exch
 
  ReadRegStr $0 HKCR "http\shell\open\command" ""
# Get browser path
    DetailPrint $0
  StrCpy $2 '"'
  StrCpy $1 $0 1
  StrCmp $1 $2 +2 # if path is not enclosed in " look for space as final char
    StrCpy $2 ' '
  StrCpy $3 1
  loop:
    StrCpy $1 $0 1 $3
    DetailPrint $1
    StrCmp $1 $2 found
    StrCmp $1 "" found
    IntOp $3 $3 + 1
    Goto loop
 
  found:
    StrCpy $1 $0 $3
    StrCmp $2 " " +2
      StrCpy $1 '$1"'
 
  Pop $0
  Exec '$1 $0'
  Pop $0
  Pop $1
  Pop $2
  Pop $3
FunctionEnd
 
!macro _OpenURL URL
Push "${URL}"
Call openLinkNewWindow
!macroend
 
!define OpenURL '!insertmacro "_OpenURL"'


Name "StreamToVlc Installer"

!macro VerifyUserIsAdmin
UserInfo::GetAccountType
pop $0
${If} $0 != "admin" ;Require admin rights on NT4+
        messageBox mb_iconstop "Administrator rights required!"
        setErrorLevel 740 ;ERROR_ELEVATION_REQUIRED
        quit
${EndIf}
!macroend

function .onInit
	setShellVarContext all
	!insertmacro VerifyUserIsAdmin
functionEnd

InstallDir "C:\Program Files (x86)\VideoLAN\VLC\"
InstallDirRegKey HKLM "Software\VideoLAN\VLC" "InstallDir" 
 
# default section
Section "install"
	# Files for the install directory - to build the installer, these should be in the same directory as the install script (this file)
	setOutPath $INSTDIR

	# Files added here should be removed by the uninstaller (see section "uninstall")
	file "StreamToVlc.bat"

  FileOpen $4 "$INSTDIR\StreamToVlc.bat" a
  FileSeek $4 0 END
  FileWrite $4 "$\r$\n" ; we write a new line
  FileWrite $4 "cd $\"C:\Program Files (x86)\VideoLAN\VLC\$\""
  FileWrite $4 "$\r$\n" ; we write an extra line
  FileWrite $4 "start vlc --http-reconnect %argp%"
  FileClose $4 ; and close the file

	# Uninstaller - See function un.onInit and section "uninstall" for configuration
	writeUninstaller "$INSTDIR\StreamToVlcUninstaller.exe"
 

	WriteRegStr HKCR "vlcs" "URL Protocol" ""
	WriteRegStr HKCR "vlcs\shell" "" ""
	WriteRegStr HKCR "vlcs\shell\open" "" ""
	WriteRegStr HKCR "vlcs\shell\open\command" "" "$\"$INSTDIR\StreamToVlc.bat$\" $\"%1$\""

	MessageBox MB_OK "Install Tampermonkey extension in your browser"
	${OpenURL} "https://www.google.com/search?ei=X0OxW-6APcmRsgGpp724DQ&q=tampermonkey+browser+extension&oq=tampermonkey+brows+extension&gs_l=psy-ab.3.0.0i7i30k1j0i8i7i30k1l2.10932.11852.0.12715.6.6.0.0.0.0.97.531.6.6.0....0...1c.1.64.psy-ab..0.6.529...0.0.-3s1uJfUd6U"
	MessageBox MB_OK "Click Ok when done"
	MessageBox MB_OK "Press Ok then press on $\"Install this script$\""
	${OpenURL} "https://greasyfork.org/en/scripts/34206-stream-to-vlc"
	MessageBox MB_OK "Done! On the first use remember to check to remember the choice in the browser and to accept the certificate in Vlc."


SectionEnd


# Uninstaller
 
function un.onInit
	SetShellVarContext all
 
	#Verify the uninstaller - last chance to back out
	MessageBox MB_OKCANCEL "Permanantly remove StreamToVlc?" IDOK next
		Abort
	next:
	!insertmacro VerifyUserIsAdmin
functionEnd


section "uninstall"

	Delete "$INSTDIR/StreamToVlc.bat"
	Delete "$INSTDIR/StreamToVlcInstaller.exe"
	rmDir "$INSTDIR"

	DeleteRegkey HKCR "vlcs"
sectionEnd


Function .onVerifyInstDir
    IfFileExists "$INSTDIR\vlc.exe" FileIsThere
    Abort ; user can´t go on if "somefile.exe" isn´t present
    FileIsThere:
FunctionEnd